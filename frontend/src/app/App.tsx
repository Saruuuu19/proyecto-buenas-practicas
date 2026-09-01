import { BrowserRouter } from "react-router-dom";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { AppRoutes } from "./router";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;