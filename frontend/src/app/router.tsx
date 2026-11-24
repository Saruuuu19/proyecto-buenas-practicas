import { Routes, Route } from "react-router-dom";
import { HomePage } from "../features/home/pages/HomePage";
import { ProductsPage } from "../features/products/pages/ProductsPage";
import { CartPage } from "../features/cart/pages/CartPage";
import { CheckoutPage } from "../features/cart/pages/CheckoutPage";
import { NotFound } from "./NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
