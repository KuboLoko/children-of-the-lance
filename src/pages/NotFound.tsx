import { Link } from "react-router-dom";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function NotFound() {
  useDocumentMeta("Página não encontrada · Children of the Lance");

  return (
    <div className="cotl-container cotl-section" style={{ textAlign: "center" }}>
      <p className="cotl-eyebrow">404</p>
      <h1>Esta página perdeu-se em Ansalon</h1>
      <p className="cotl-lead" style={{ margin: "0 auto 2rem" }}>
        O caminho que seguiste não leva a lado nenhum.
      </p>
      <Link className="cotl-btn cotl-btn--primary" to="/">
        Voltar ao início
      </Link>
    </div>
  );
}
