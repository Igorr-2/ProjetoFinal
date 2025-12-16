import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundImage: "url('https://images.unsplash.com/photo-1600891964092-4316c288032e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textShadow: "1px 1px 2px black",
      }}
    >
      <h1>🍕 SENAI - Sistema de Alimentação</h1>
      <p>Organização rápida, pedidos eficientes e retirada sem filas!</p>

      <div>
        <Link style={{ color: "yellow", fontWeight: "bold" }} to="/Financeiro">
          Financeiro
        </Link>{" "}
        |{" "}
        <Link style={{ color: "yellow", fontWeight: "bold" }} to="/Vendas">
          Vendas
        </Link>{" "}
        |{" "}
        <Link style={{ color: "yellow", fontWeight: "bold" }} to="/Estoque">
          Estoque
        </Link>{" "}
        |{" "}
        <Link style={{ color: "yellow", fontWeight: "bold" }} to="/Bi">
          BI
        </Link>{" "}
        |{" "}
        <Link style={{ color: "yellow", fontWeight: "bold" }} to="/Clientes">
          Clientes
        </Link>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>📌 Últimas novidades</h2>
        <ul>
          <li>Integração com pedidos e lista de itens</li>
          <li>Controle de estoque atualizado automaticamente.</li>
          <li>Relatórios rápidos e gerenciamento inteligente de vendas.</li>
        </ul>
      </div>
    </div>
  );
}
