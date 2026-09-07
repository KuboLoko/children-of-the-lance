import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Historia } from "./pages/Historia";
import { Personagens } from "./pages/Personagens";
import { Conflito } from "./pages/Conflito";
import { Ler } from "./pages/Ler";
import { Creditos } from "./pages/Creditos";
import { NotFound } from "./pages/NotFound";

/**
 * Root-level routes. Add a page by creating a component in src/pages and
 * listing it here (and in src/data/site.ts COTL_NAV if it needs a nav link).
 */
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/historia", element: <Historia /> },
      { path: "/personagens", element: <Personagens /> },
      { path: "/conflito", element: <Conflito /> },
      { path: "/ler", element: <Ler /> },
      { path: "/creditos", element: <Creditos /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
