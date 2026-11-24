export type ProductBadge = "Nuevo" | "Más vendido" | "Disponible" | "Oferta";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: number;
  reviews?: number;
  originalPrice?: number;
  badge?: ProductBadge;
}