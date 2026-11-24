import { BrowserRouter } from "react-router-dom";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { AppRoutes } from "./router";
import { AuthProvider } from "../features/auth/context/AuthContext";
import { CartProvider } from "../features/cart/context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg no-underline"
        >
          Saltar al contenido
        </a>
        <div className="flex min-h-svh flex-col bg-background text-on-background">
          <Header />
          <main id="main" className="grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;