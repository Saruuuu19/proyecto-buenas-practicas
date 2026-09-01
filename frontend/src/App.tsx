import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Productos } from "./pages/Productos";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh flex-col bg-background text-on-background">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
