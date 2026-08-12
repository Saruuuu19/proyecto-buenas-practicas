const API_URL = "http://localhost:3000/api/catalogo";

const FREE_SHIPPING_THRESHOLD = 149000;
const SHIPPING_COST = 9900;
const CART_STORAGE_KEY = "modaflex-cart";

let PRODUCTS = [];
let cart = loadCart();

const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartEmptyEl = document.getElementById("cart-empty");
const cartCountEl = document.getElementById("cart-count");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const totalEl = document.getElementById("total");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const toastEl = document.getElementById("toast");

const currency = (value) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function findCartItem(productId) {
  return cart.find((item) => item.id === productId);
}

function getProduct(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}

function addToCart(productId) {
  const product = getProduct(productId);
  if (!product) return;

  const existing = findCartItem(productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  saveCart();
  renderCart();
  renderProductCounts();
  showToast(`"${product.name}" agregado al carrito`);
  playSound();
}

function updateQuantity(productId, delta) {
  const item = findCartItem(productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getSubtotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

function getShipping() {
  const subtotal = getSubtotal();
  if (cart.length === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();

    PRODUCTS = data.map((product) => ({
      id: product.id,
      name: product.titulo,
      price: product.precio,
      image: product.imagen.replace(/^\.\.\//, ""),
      description: product.descripcion,
    }));

    renderProducts();
    renderCart();
  } catch {
    productListEl.innerHTML = `
      <div class="catalog-error">
        <p>No se pudo conectar con el servidor.</p>
        <small>Asegúrate de que el backend esté corriendo en <strong>http://localhost:3000</strong></small>
      </div>
    `;
  }
}

function renderProducts() {
  productListEl.innerHTML = PRODUCTS.map(
    (product) => `
      <article class="product-card">
        <div class="product-card__media">
          <img class="product-card__image" src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-card__overlay">
            <button class="product-card__cart-icon" data-id="${product.id}" aria-label="Agregar al carrito">🛒</button>
          </div>
        </div>
        <div class="product-card__body">
          <h3 class="product-card__name">${product.name}</h3>
          <span class="product-card__price">${currency(product.price)}</span>
          <div class="product-card__actions">
            <button class="add-button" data-id="${product.id}">Agregar al carrito</button>
            <div class="product-card__stepper hidden" data-stepper-for="${product.id}">
              <button class="product-card__step" data-action="increase" data-id="${product.id}" aria-label="Aumentar cantidad">+</button>
              <span class="product-card__badge" data-count-for="${product.id}">0</span>
              <button class="product-card__step" data-action="decrease" data-id="${product.id}" aria-label="Disminuir cantidad">&minus;</button>
            </div>
          </div>
        </div>
      </article>
    `
  ).join("");
}

function renderCart() {
  const count = getCartCount();
  cartCountEl.textContent = count;

  if (cart.length === 0) {
    cartEmptyEl.classList.remove("hidden");
    cartItemsEl.innerHTML = "";
  } else {
    cartEmptyEl.classList.add("hidden");
    cartItemsEl.innerHTML = cart
      .map((item) => {
        const product = getProduct(item.id);
        if (!product) return "";
        return `
          <article class="cart-item">
            <img class="cart-item__image" src="${product.image}" alt="${product.name}">
            <div class="cart-item__info">
              <h4 class="cart-item__name">${product.name}</h4>
              <span class="cart-item__price">${currency(product.price)}</span>
              <div class="cart-item__controls">
                <div class="quantity-control">
                  <button data-action="decrease" data-id="${product.id}" ${item.quantity <= 1 ? "disabled" : ""}>&minus;</button>
                  <span class="quantity-control__value">${item.quantity}</span>
                  <button data-action="increase" data-id="${product.id}">+</button>
                </div>
                <button class="cart-item__remove" data-action="remove" data-id="${product.id}" title="Eliminar">&times;</button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  renderTotals();
  renderProductCounts();
}

function renderTotals() {
  const subtotal = getSubtotal();
  const shipping = getShipping();

  subtotalEl.textContent = currency(subtotal);
  shippingEl.textContent = subtotal === 0 ? "$0" : shipping === 0 ? "Gratis" : currency(shipping);
  totalEl.textContent = currency(subtotal + shipping);
}

function renderProductCounts() {
  const counts = {};
  cart.forEach((item) => {
    counts[item.id] = item.quantity;
  });

  document.querySelectorAll("[data-count-for]").forEach((el) => {
    const quantity = counts[Number(el.dataset.countFor)] || 0;
    el.textContent = quantity;
    const stepper = el.closest("[data-stepper-for]");
    if (stepper) stepper.classList.toggle("hidden", quantity === 0);
  });
}

let audioContext;

function playSound() {
  try {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch {}
}

function toggleCart(open) {
  const shouldOpen = open ?? !cartDrawer.classList.contains("cart-drawer--open");
  cartDrawer.classList.toggle("cart-drawer--open", shouldOpen);
  cartOverlay.classList.toggle("hidden", !shouldOpen);
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toastEl.classList.add("hidden"), 2000);
}

productListEl.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button, .product-card__cart-icon, button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  const productId = Number(id);

  if (action === "increase") {
    updateQuantity(productId, 1);
    playSound();
    return;
  }
  if (action === "decrease") {
    updateQuantity(productId, -1);
    playSound();
    return;
  }
  addToCart(productId);
});

cartItemsEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  const productId = Number(id);

  if (action === "increase") updateQuantity(productId, 1);
  if (action === "decrease") updateQuantity(productId, -1);
  if (action === "remove") removeFromCart(productId);
});

document.getElementById("toggle-cart").addEventListener("click", () => toggleCart(true));
document.getElementById("close-cart").addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío");
    return;
  }
  showToast(`Compra realizada por ${currency(getSubtotal() + getShipping())} 🎉`);
  cart = [];
  saveCart();
  renderCart();
});

loadProducts();
renderCart();
