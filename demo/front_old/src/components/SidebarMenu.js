import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const { usuario, logout } = useContext(AuthContext);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <nav>

        {usuario && (
          <Link to="/">
            <span className="icon">🏠</span>
            <span className="link-text">Home</span>
          </Link>
        )}

        {usuario?.perfil === "ADMIN" && (
          <>
            <Link to="/financeiro">
              <span className="icon">💰</span>
              <span className="link-text">Financeiro</span>
            </Link>

            <Link to="/vendas">
              <span className="icon">🛒</span>
              <span className="link-text">Vendas</span>
            </Link>

            <Link to="/estoque">
              <span className="icon">📦</span>
              <span className="link-text">Estoque</span>
            </Link>

            <Link to="/bi">
              <span className="icon">📊</span>
              <span className="link-text">BI</span>
            </Link>
          </>
        )}

        {usuario?.perfil === "CLIENTE" && (
          <Link to="/clientes">
            <span className="icon">👥</span>
            <span className="link-text">Meus Pedidos</span>
          </Link>
        )}

        {usuario && (
          <button onClick={logout} className="logout-btn">
            🚪 Sair
          </button>
        )}

      </nav>
    </div>
  );
}

export default SidebarMenu;
