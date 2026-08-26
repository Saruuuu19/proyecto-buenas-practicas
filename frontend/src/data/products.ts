export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  badge?: "New" | "Bestseller" | "In Stock";
}

export const products: Product[] = [
  {
    id: "1",
    name: "SonicFlow Pro ANC",
    category: "Audio",
    price: 299,
    description:
      "Premium noise-canceling headphones with spatial audio and 40-hour battery life.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZla1ElKKmeOH81E1cQfGTj_-5DRp5E_GxvQCNIr6mZoS3EBIpiraMVa-CMwOj3YuQ19tGnL2nGWmXocQDT2z1xgqcq_h_GlCiM-_KEPh_vwUX3S1EPyZNmfvHh-98u1WdPJdYWVe1uAUW6gob2sFZLrlieDORxwOFW2hc-12NelDtjaA_pIiGDiGl-CAZ3rjjnVrhHII0TTZzBEJror6GpsJLJsZd_eEr9g6c_pF-Tmz4QJpfE0",
    badge: "New",
  },
  {
    id: "2",
    name: "AeroBook X14",
    category: "Computing",
    price: 1299,
    description:
      "Ultra-light 14\" laptop with M2-class processing and all-day battery.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAW9e1mZsOETI_fgje4ghDxeR9CyxmNQBYFo3uJi4hpF-lYLAT-aBbPVk8sqtWc4lPeOPVORhrVoe9XViH23kQ5FxFg8Ui1vSd3UbbyKy1l0Hxm9JRhhz9ckC5LNDxuASOyFDkINNnO5uFWrO9wg2TAjMNYigqWFsbwM4St_Hw8RH2iaLmQih72vbx9htoC1R9hkyEIQMNttAZxWDF7_FTfAA2zkOUeQH-XRvrmXC5sqMgQROficvro",
  },
  {
    id: "3",
    name: "Pulse Watch Series 4",
    category: "Wearables",
    price: 349,
    description:
      "Advanced fitness tracking and cellular connectivity in a sleek aluminum case.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcY4H9nEqXQeHUOjTeEFFQhQPFpUkXQREA-yOH9k3U4KyxSEqH8VZruvQx7zxQc3-xYJDf-jS6gfdq5FlgViL2q-_KnN-w6W2fV_oHqArbd5956u3Ie7grUWQftNRzAYR9TRHVGsKkH_IxJhBo_5ZIuKCKybpTq_Fr2zg3a6RaO_pBgZuNOm-tk7BAqUowhfBYUAgJliglCIBZSVlrZZ8p2iQWLopH8dV83FJh4zgXHKElecaPeirc",
    badge: "Bestseller",
  },
  {
    id: "4",
    name: "Tactile Pro Keyboard",
    category: "Accessories",
    price: 149,
    description:
      "Wireless mechanical keyboard with low-profile switches and aluminum chassis.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAM4d8hHTXo5do0p3XShNLFrP1QS4vt05dzlz193yWgMq8WC5p4z_GfEr9-xquqIa-L39NyC2bsNpc3SbJrRgCK_CiUhxyenmCEEIrCkgmcFCqgVcwtp3uRGdIVQ4WtDpx6LcgjA9IoBET4G0kRESTaP1GZvXyUHTQw4_ZD2j-CkKmhaBWRuOJd1DaBzXbd5VFms5d1DWZqk5VJDuiZ50MfZulgkUCHXv__ktESeEKkp_rSvEoH8H7",
  },
  {
    id: "5",
    name: "EchoSphere Audio",
    category: "Audio",
    price: 199,
    description:
      "360-degree smart speaker with deep bass and voice assistant integration.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQc9V5FK6TDMZxqLC7EgSWDS47MdeX_geOJVvTOBS4h0x0hpphBofDUviVq_5z_RW8yttAs-lcF0zS-V5BZCygjLli5UFmkPKQ21qNW5OWZOh1aqyxu1fLJubaYlwW7dmQkoVXVD2pmBS-6EglOjrM-_EJYDJEgkbKojvPpZEO9XwsVz5q6hGJdPhXomz7RtnYxW38qXCjHs1NKameUMDmGIwsXaxDrMfBvNGDgiWm9d32z9H4R7s7",
  },
  {
    id: "6",
    name: "AeroBuds Mini",
    category: "Audio",
    price: 129,
    description:
      "Ultra-compact true wireless earbuds with transparent mode.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCskKlIDNZB2wQ93OFmh6LX3CkN4oCJ97GFpz8fH_0mORwsEVdIEMMqYcaWLs7npcN5u_Q0oHxtayAhAaVJkssO2zUuU9ag1wP6rx3t3sVyzs3Aiy47x6jrNbjyXQb8n6aZtvegQc9j0oMFHudEiR_H0HyRlm41-HnNDekkO8KDXvvl2VqMEoVx3Sp1-zgbHaVvpq9P4c7ehoPkAxByJNFQeotuKZaVWQY3QTwf9C21L_-kfjZbnU9S",
    badge: "In Stock",
  },
  {
    id: "7",
    name: "NovaPad Pro",
    category: "Computing",
    price: 899,
    description:
      "12.9-inch tablet with Retina display and stylus support for creative pros.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZla1ElKKmeOH81E1cQfGTj_-5DRp5E_GxvQCNIr6mZoS3EBIpiraMVa-CMwOj3YuQ19tGnL2nGWmXocQDT2z1xgqcq_h_GlCiM-_KEPh_vwUX3S1EPyZNmfvHh-98u1WdPJdYWVe1uAUW6gob2sFZLrlieDORxwOFW2hc-12NelDtjaA_pIiGDiGl-CAZ3rjjnVrhHII0TTZzBEJror6GpsJLJsZd_eEr9g6c_pF-Tmz4QJpfE0",
    badge: "New",
  },
  {
    id: "8",
    name: "ChargeDock Ultra",
    category: "Accessories",
    price: 79,
    description:
      "3-in-1 wireless charging dock for phone, watch, and earbuds.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQc9V5FK6TDMZxqLC7EgSWDS47MdeX_geOJVvTOBS4h0x0hpphBofDUviVq_5z_RW8yttAs-lcF0zS-V5BZCygjLli5UFmkPKQ21qNW5OWZOh1aqyxu1fLJubaYlwW7dmQkoVXVD2pmBS-6EglOjrM-_EJYDJEgkbKojvPpZEO9XwsVz5q6hGJdPhXomz7RtnYxW38qXCjHs1NKameUMDmGIwsXaxDrMfBvNGDgiWm9d32z9H4R7s7",
  },
];

export const categories = [
  { name: "Audio", icon: "headphones" },
  { name: "Computing", icon: "laptop" },
  { name: "Wearables", icon: "watch" },
  { name: "Accessories", icon: "keyboard" },
] as const;
