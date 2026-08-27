import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";

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
    <BrowserRouter>
      <div className="flex min-h-svh flex-col bg-background text-on-background">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
