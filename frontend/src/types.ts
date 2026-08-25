export interface ProductBase {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Product extends ProductBase {
  id: number;
}
