import React from "react";

export default function NotFound() {
  return (
    <div className="container">
      <div className="card form-box">
        <h2 className="page-title">Página não encontrada</h2>
        <p className="subtitle">
          O endereço que procurou não existe ou foi removido.
        </p>
        <a href="/login" className="btn-primary">Voltar ao Login</a>
      </div>
    </div>
  );
}
