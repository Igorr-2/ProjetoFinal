import { Link } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    background: "#fff"
  },

  topSection: {
    background: "#0a58ca",
    color: "#fff",
    padding: "40px 60px",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)"
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "16px",
    opacity: 0.9,
    marginBottom: "25px"
  },

  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px"
  },

  navButton: {
    background: "#ffcc4d",
    color: "#333",
    padding: "12px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "0.2s ease-in-out"
  },

  navButtonHover: {
    background: "#ffe28a",
    transform: "scale(1.05)"
  },

  bottomSection: {
    flex: 1,
    padding: "40px 60px",
    background: "#fff"
  }
};

export default function HomeAdmin() {
  return (
    <div style={styles.container}>

      {/* TOPO AZUL */}
      <div style={styles.topSection}>
        <h1 style={styles.title}>Área Administrativa – Cantina</h1>
        <p style={styles.subtitle}>Acesse abaixo as principais áreas do sistema:</p>

        <nav style={styles.nav}>
          <Link style={styles.navButton} to="/admin/estoque">📦 Estoque</Link>
          <Link style={styles.navButton} to="/admin/financeiro">💰 Financeiro</Link>
          <Link style={styles.navButton} to="/admin/vendas">🛒 Vendas</Link>
          <Link style={styles.navButton} to="/admin/bi">📊 BI</Link>
          <Link style={styles.navButton} to="/admin/dashboards">📈 Dashboards</Link>
          <Link style={styles.navButton} to="/admin/gerenciais">⚙️ Gerenciais</Link>
        </nav>
      </div>

      {/* PARTE INFERIOR BRANCA (AGORA VAZIA) */}
      <div style={styles.bottomSection}></div>

    </div>
  );
}
