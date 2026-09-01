export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  badge?: "Nuevo" | "Más vendido" | "Disponible" | "Oferta";
}

export const products: Product[] = [
  {
    id: "1",
    name: "SonicFlow Pro ANC",
    category: "Audífonos",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 342,
    description:
      "Audífonos premium con cancelación de ruido, audio espacial y 40 horas de batería.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZla1ElKKmeOH81E1cQfGTj_-5DRp5E_GxvQCNIr6mZoS3EBIpiraMVa-CMwOj3YuQ19tGnL2nGWmXocQDT2z1xgqcq_h_GlCiM-_KEPh_vwUX3S1EPyZNmfvHh-98u1WdPJdYWVe1uAUW6gob2sFZLrlieDORxwOFW2hc-12NelDtjaA_pIiGDiGl-CAZ3rjjnVrhHII0TTZzBEJror6GpsJLJsZd_eEr9g6c_pF-Tmz4QJpfE0",
    badge: "Oferta",
  },
  {
    id: "2",
    name: "AeroBook X14",
    category: "Computadoras",
    price: 1299,
    rating: 4.9,
    reviews: 218,
    description:
      "Laptop ultraligera de 14\" con procesador de clase M2 y batería para todo el día.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAW9e1mZsOETI_fgje4ghDxeR9CyxmNQBYFo3uJi4hpF-lYLAT-aBbPVk8sqtWc4lPeOPVORhrVoe9XViH23kQ5FxFg8Ui1vSd3UbbyKy1l0Hxm9JRhhz9ckC5LNDxuASOyFDkINNnO5uFWrO9wg2TAjMNYigqWFsbwM4St_Hw8RH2iaLmQih72vbx9htoC1R9hkyEIQMNttAZxWDF7_FTfAA2zkOUeQH-XRvrmXC5sqMgQROficvro",
  },
  {
    id: "3",
    name: "Pulse Watch Series 4",
    category: "Relojes",
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviews: 567,
    description:
      "Seguimiento avanzado de fitness y conectividad celular en una carcasa de aluminio elegante.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcY4H9nEqXQeHUOjTeEFFQhQPFpUkXQREA-yOH9k3U4KyxSEqH8VZruvQx7zxQc3-xYJDf-jS6gfdq5FlgViL2q-_KnN-w6W2fV_oHqArbd5956u3Ie7grUWQftNRzAYR9TRHVGsKkH_IxJhBo_5ZIuKCKybpTq_Fr2zg3a6RaO_pBgZuNOm-tk7BAqUowhfBYUAgJliglCIBZSVlrZZ8p2iQWLopH8dV83FJh4zgXHKElecaPeirc",
    badge: "Más vendido",
  },
  {
    id: "4",
    name: "Tactile Pro Keyboard",
    category: "Accesorios",
    price: 149,
    rating: 4.6,
    reviews: 189,
    description:
      "Teclado mecánico inalámbrico con switches de perfil bajo y chasis de aluminio.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAM4d8hHTXo5do0p3XShNLFrP1QS4vt05dzlz193yWgMq8WC5p4z_GfEr9-xquqIa-L39NyC2bsNpc3SbJrRgCK_CiUhxyenmCEEIrCkgmcFCqgVcwtp3uRGdIVQ4WtDpx6LcgjA9IoBET4G0kRESTaP1GZvXyUHTQw4_ZD2j-CkKmhaBWRuOJd1DaBzXbd5VFms5d1DWZqk5VJDuiZ50MfZulgkUCHXv__ktESeEKkp_rSvEoH8H7",
  },
  {
    id: "5",
    name: "EchoSphere Audio",
    category: "Bocinas",
    price: 199,
    originalPrice: 249,
    rating: 4.5,
    reviews: 423,
    description:
      "Altavoz inteligente 360 grados con graves profundos e integración con asistente de voz.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQc9V5FK6TDMZxqLC7EgSWDS47MdeX_geOJVvTOBS4h0x0hpphBofDUviVq_5z_RW8yttAs-lcF0zS-V5BZCygjLli5UFmkPKQ21qNW5OWZOh1aqyxu1fLJubaYlwW7dmQkoVXVD2pmBS-6EglOjrM-_EJYDJEgkbKojvPpZEO9XwsVz5q6hGJdPhXomz7RtnYxW38qXCjHs1NKameUMDmGIwsXaxDrMfBvNGDgiWm9d32z9H4R7s7",
    badge: "Oferta",
  },
  {
    id: "6",
    name: "AeroBuds Mini",
    category: "Audífonos",
    price: 129,
    rating: 4.4,
    reviews: 891,
    description:
      "Auriculares inalámbricos verdaderos ultra compactos con modo transparente.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCskKlIDNZB2wQ93OFmh6LX3CkN4oCJ97GFpz8fH_0mORwsEVdIEMMqYcaWLs7npcN5u_Q0oHxtayAhAaVJkssO2zUuU9ag1wP6rx3t3sVyzs3Aiy47x6jrNbjyXQb8n6aZtvegQc9j0oMFHudEiR_H0HyRlm41-HnNDekkO8KDXvvl2VqMEoVx3Sp1-zgbHaVvpq9P4c7ehoPkAxByJNFQeotuKZaVWQY3QTwf9C21L_-kfjZbnU9S",
    badge: "Disponible",
  },
  {
    id: "7",
    name: "NovaPad Pro",
    category: "Computadoras",
    price: 899,
    originalPrice: 999,
    rating: 4.8,
    reviews: 156,
    description:
      "Tablet de 12.9 pulgadas con pantalla Retina y soporte de stylus para creativos profesionales.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZla1ElKKmeOH81E1cQfGTj_-5DRp5E_GxvQCNIr6mZoS3EBIpiraMVa-CMwOj3YuQ19tGnL2nGWmXocQDT2z1xgqcq_h_GlCiM-_KEPh_vwUX3S1EPyZNmfvHh-98u1WdPJdYWVe1uAUW6gob2sFZLrlieDORxwOFW2hc-12NelDtjaA_pIiGDiGl-CAZ3rjjnVrhHII0TTZzBEJror6GpsJLJsZd_eEr9g6c_pF-Tmz4QJpfE0",
    badge: "Nuevo",
  },
  {
    id: "8",
    name: "ChargeDock Ultra",
    category: "Accesorios",
    price: 79,
    rating: 4.3,
    reviews: 634,
    description:
      "Estación de carga inalámbrica 3 en 1 para teléfono, reloj y auriculares.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQc9V5FK6TDMZxqLC7EgSWDS47MdeX_geOJVvTOBS4h0x0hpphBofDUviVq_5z_RW8yttAs-lcF0zS-V5BZCygjLli5UFmkPKQ21qNW5OWZOh1aqyxu1fLJubaYlwW7dmQkoVXVD2pmBS-6EglOjrM-_EJYDJEgkbKojvPpZEO9XwsVz5q6hGJdPhXomz7RtnYxW38qXCjHs1NKameUMDmGIwsXaxDrMfBvNGDgiWm9d32z9H4R7s7",
  },
  {
    id: "9",
    name: "Galaxy Ultra S24",
    category: "Celulares",
    price: 1099,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 1243,
    description:
      "Smartphone premium con cámara de 200MP, pantalla AMOLED 120Hz y S Pen incluido.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZla1ElKKmeOH81E1cQfGTj_-5DRp5E_GxvQCNIr6mZoS3EBIpiraMVa-CMwOj3YuQ19tGnL2nGWmXocQDT2z1xgqcq_h_GlCiM-_KEPh_vwUX3S1EPyZNmfvHh-98u1WdPJdYWVe1uAUW6gob2sFZLrlieDORxwOFW2hc-12NelDtjaA_pIiGDiGl-CAZ3rjjnVrhHII0TTZzBEJror6GpsJLJsZd_eEr9g6c_pF-Tmz4QJpfE0",
    badge: "Más vendido",
  },
  {
    id: "10",
    name: "AirPods Pro 3",
    category: "Audífonos",
    price: 249,
    rating: 4.8,
    reviews: 2341,
    description:
      "Auriculares con cancelación activa de ruido adaptativa y audio espacial personalizado.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCskKlIDNZB2wQ93OFmh6LX3CkN4oCJ97GFpz8fH_0mORwsEVdIEMMqYcaWLs7npcN5u_Q0oHxtayAhAaVJkssO2zUuU9ag1wP6rx3t3sVyzs3Aiy47x6jrNbjyXQb8n6aZtvegQc9j0oMFHudEiR_H0HyRlm41-HnNDekkO8KDXvvl2VqMEoVx3Sp1-zgbHaVvpq9P4c7ehoPkAxByJNFQeotuKZaVWQY3QTwf9C21L_-kfjZbnU9S",
    badge: "Nuevo",
  },
  {
    id: "11",
    name: "MacBook Air M3",
    category: "Computadoras",
    price: 1199,
    originalPrice: 1399,
    rating: 4.9,
    reviews: 876,
    description:
      "Laptop ultradelgada con chip M3, pantalla Liquid Retina de 13.6\" y 18 horas de batería.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAW9e1mZsOETI_fgje4ghDxeR9CyxmNQBYFo3uJi4hpF-lYLAT-aBbPVk8sqtWc4lPeOPVORhrVoe9XViH23kQ5FxFg8Ui1vSd3UbbyKy1l0Hxm9JRhhz9ckC5LNDxuASOyFDkINNnO5uFWrO9wg2TAjMNYigqWFsbwM4St_Hw8RH2iaLmQih72vbx9htoC1R9hkyEIQMNttAZxWDF7_FTfAA2zkOUeQH-XRvrmXC5sqMgQROficvro",
    badge: "Oferta",
  },
  {
    id: "12",
    name: "PlayStation DualSense",
    category: "Accesorios",
    price: 69,
    rating: 4.7,
    reviews: 3456,
    description:
      "Mando inalámbrico con gatillos adaptativos, vibración háptica y conexión USB-C.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAM4d8hHTXo5do0p3XShNLFrP1QS4vt05dzlz193yWgMq8WC5p4z_GfEr9-xquqIa-L39NyC2bsNpc3SbJrRgCK_CiUhxyenmCEEIrCkgmcFCqgVcwtp3uRGdIVQ4WtDpx6LcgjA9IoBET4G0kRESTaP1GZvXyUHTQw4_ZD2j-CkKmhaBWRuOJd1DaBzXbd5VFms5d1DWZqk5VJDuiZ50MfZulgkUCHXv__ktESeEKkp_rSvEoH8H7",
  },
  {
    id: "13",
    name: "iPad Air M2",
    category: "Computadoras",
    price: 599,
    rating: 4.8,
    reviews: 543,
    description:
      "Tablet potente con chip M2, pantalla Liquid Retina de 11\" y soporte para Apple Pencil Pro.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZla1ElKKmeOH81E1cQfGTj_-5DRp5E_GxvQCNIr6mZoS3EBIpiraMVa-CMwOj3YuQ19tGnL2nGWmXocQDT2z1xgqcq_h_GlCiM-_KEPh_vwUX3S1EPyZNmfvHh-98u1WdPJdYWVe1uAUW6gob2sFZLrlieDORxwOFW2hc-12NelDtjaA_pIiGDiGl-CAZ3rjjnVrhHII0TTZzBEJror6GpsJLJsZd_eEr9g6c_pF-Tmz4QJpfE0",
  },
  {
    id: "14",
    name: "Galaxy Watch 6",
    category: "Relojes",
    price: 279,
    originalPrice: 329,
    rating: 4.6,
    reviews: 892,
    description:
      "Reloj inteligente con monitor de salud avanzado, GPS dual y resistencia al agua IP68.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcY4H9nEqXQeHUOjTeEFFQhQPFpUkXQREA-yOH9k3U4KyxSEqH8VZruvQx7zxQc3-xYJDf-jS6gfdq5FlgViL2q-_KnN-w6W2fV_oHqArbd5956u3Ie7grUWQftNRzAYR9TRHVGsKkH_IxJhBo_5ZIuKCKybpTq_Fr2zg3a6RaO_pBgZuNOm-tk7BAqUowhfBYUAgJliglCIBZSVlrZZ8p2iQWLopH8dV83FJh4zgXHKElecaPeirc",
    badge: "Oferta",
  },
  {
    id: "15",
    name: "Logitech MX Master 3S",
    category: "Accesorios",
    price: 99,
    rating: 4.8,
    reviews: 1567,
    description:
      "Mouse inalámbrico ergonómico con scroll magnético, 8K DPI y conexión multi-dispositivo.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAM4d8hHTXo5do0p3XShNLFrP1QS4vt05dzlz193yWgMq8WC5p4z_GfEr9-xquqIa-L39NyC2bsNpc3SbJrRgCK_CiUhxyenmCEEIrCkgmcFCqgVcwtp3uRGdIVQ4WtDpx6LcgjA9IoBET4G0kRESTaP1GZvXyUHTQw4_ZD2j-CkKmhaBWRuOJd1DaBzXbd5VFms5d1DWZqk5VJDuiZ50MfZulgkUCHXv__ktESeEKkp_rSvEoH8H7",
  },
  {
    id: "16",
    name: "JBL Charge 5",
    category: "Bocinas",
    price: 179,
    originalPrice: 219,
    rating: 4.7,
    reviews: 2890,
    description:
      "Bocina portátil resistente al agua con 20 horas de batería y función de powerbank.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQc9V5FK6TDMZxqLC7EgSWDS47MdeX_geOJVvTOBS4h0x0hpphBofDUviVq_5z_RW8yttAs-lcF0zS-V5BZCygjLli5UFmkPKQ21qNW5OWZOh1aqyxu1fLJubaYlwW7dmQkoVXVD2pmBS-6EglOjrM-_EJYDJEgkbKojvPpZEO9XwsVz5q6hGJdPhXomz7RtnYxW38qXCjHs1NKameUMDmGIwsXaxDrMfBvNGDgiWm9d32z9H4R7s7",
    badge: "Más vendido",
  },
  {
    id: "17",
    name: "iPhone 15 Pro Max",
    category: "Celulares",
    price: 1199,
    rating: 4.9,
    reviews: 3456,
    description:
      "Smartphone con chip A17 Pro, cámara de 48MP con zoom óptico 5x y cuerpo de titanio.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZla1ElKKmeOH81E1cQfGTj_-5DRp5E_GxvQCNIr6mZoS3EBIpiraMVa-CMwOj3YuQ19tGnL2nGWmXocQDT2z1xgqcq_h_GlCiM-_KEPh_vwUX3S1EPyZNmfvHh-98u1WdPJdYWVe1uAUW6gob2sFZLrlieDORxwOFW2hc-12NelDtjaA_pIiGDiGl-CAZ3rjjnVrhHII0TTZzBEJror6GpsJLJsZd_eEr9g6c_pF-Tmz4QJpfE0",
    badge: "Nuevo",
  },
  {
    id: "18",
    name: "Razer BlackWidow V4",
    category: "Accesorios",
    price: 169,
    rating: 4.5,
    reviews: 678,
    description:
      "Teclado mecánico gaming con switches verdes, RGB Chroma y reposamuñecas magnético.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAM4d8hHTXo5do0p3XShNLFrP1QS4vt05dzlz193yWgMq8WC5p4z_GfEr9-xquqIa-L39NyC2bsNpc3SbJrRgCK_CiUhxyenmCEEIrCkgmcFCqgVcwtp3uRGdIVQ4WtDpx6LcgjA9IoBET4G0kRESTaP1GZvXyUHTQw4_ZD2j-CkKmhaBWRuOJd1DaBzXbd5VFms5d1DWZqk5VJDuiZ50MfZulgkUCHXv__ktESeEKkp_rSvEoH8H7",
  },
  {
    id: "19",
    name: "Samsung Tab S9 Ultra",
    category: "Computadoras",
    price: 1099,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 432,
    description:
      "Tablet Android de 14.6\" con Dynamic AMOLED 2X, Snapdragon 8 Gen 2 y S Pen.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAW9e1mZsOETI_fgje4ghDxeR9CyxmNQBYFo3uJi4hpF-lYLAT-aBbPVk8sqtWc4lPeOPVORhrVoe9XViH23kQ5FxFg8Ui1vSd3UbbyKy1l0Hxm9JRhhz9ckC5LNDxuASOyFDkINNnO5uFWrO9wg2TAjMNYigqWFsbwM4St_Hw8RH2iaLmQih72vbx9htoC1R9hkyEIQMNttAZxWDF7_FTfAA2zkOUeQH-XRvrmXC5sqMgQROficvro",
    badge: "Oferta",
  },
  {
    id: "20",
    name: "Sony WH-1000XM5",
    category: "Audífonos",
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviews: 4567,
    description:
      "Audífonos inalámbricos con la mejor cancelación de ruido del mercado y 30 horas de batería.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZla1ElKKmeOH81E1cQfGTj_-5DRp5E_GxvQCNIr6mZoS3EBIpiraMVa-CMwOj3YuQ19tGnL2nGWmXocQDT2z1xgqcq_h_GlCiM-_KEPh_vwUX3S1EPyZNmfvHh-98u1WdPJdYWVe1uAUW6gob2sFZLrlieDORxwOFW2hc-12NelDtjaA_pIiGDiGl-CAZ3rjjnVrhHII0TTZzBEJror6GpsJLJsZd_eEr9g6c_pF-Tmz4QJpfE0",
    badge: "Más vendido",
  },
];

export const categories = [
  { name: "Audífonos", icon: "headphones", count: 4 },
  { name: "Computadoras", icon: "laptop", count: 4 },
  { name: "Relojes", icon: "watch", count: 2 },
  { name: "Accesorios", icon: "keyboard", count: 5 },
  { name: "Celulares", icon: "laptop", count: 2 },
  { name: "Bocinas", icon: "headphones", count: 2 },
] as const;
