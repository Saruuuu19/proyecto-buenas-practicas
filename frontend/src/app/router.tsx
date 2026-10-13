import { Routes, Route } from "react-router-dom";
import { HomePage } from "../features/home/pages/HomePage";
import { ProductsPage } from "../features/products/pages/ProductsPage";
import { NotFound } from "./NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}