import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../../lib/utils";
import { HomePage } from "../features/home/pages/HomePage";
import { ProductsPage } from "../features/products/pages/ProductsPage";
import { CartPage } from "../features/cart/pages/CartPage";
import { CheckoutPage } from "../features/cart/pages/CheckoutPage";
import { NotFound } from "./NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
