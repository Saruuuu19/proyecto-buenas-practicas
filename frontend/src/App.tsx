import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CartSidebar } from "./components/cart/CartSidebar";
import { Home } from "./pages/Home";
import { Productos } from "./pages/Productos";
import { Carrito } from "./pages/Carrito";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex min-h-svh flex-col bg-background text-on-background">
          <Header />
          <CartSidebar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
