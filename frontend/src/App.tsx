import { useEffect } from 'react';
import { api } from './api/client';
import type { Product } from './types';

function App() {
  useEffect(() => {
    api
      .get<Product[]>('/products/')
      .then((res) => {
        console.log('Productos:', res.data);
      })
      .catch((err) => {
        console.error('Error al obtener productos:', err);
      });
  }, []);

  return (
    <main className="flex min-h-svh items-center justify-center">
      <h1 className="text-3xl font-semibold">Frontend</h1>
    </main>
  );
}

export default App;
