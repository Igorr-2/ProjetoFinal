import { useNavigate } from "react-router-dom";

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* LADO ESQUERDO AZUL */}
        <div style={styles.left}>
          <h2 style={styles.leftTitle}>Cantina SESI</h2>
          <p style={styles.leftText}>
            Bem-vindo! <br />
            Acesse sua conta ou crie uma nova.
          </p>
        </div>

        {/* LADO DIREITO */}
        <div style={styles.right}>
          <h2 style={styles.rightTitle}>Acesse sua conta</h2>
          <p style={styles.subtitle}>
            Escolha uma opção para continuar
          </p>

          <button
            style={styles.mainButton}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/cadastro")}
          >
            Cadastro
          </button>
        </div>

      </div>
    </div>
  );
}

/* ===================== */
/* ESTILOS INLINE */
/* ===================== */

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "800px",
    height: "420px",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    overflow: "hidden"
  },

  /* LADO ESQUERDO */
  left: {
    width: "40%",
    backgroundColor: "#0d5be1",
    color: "#fff",
    padding: "40px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  leftTitle: {
    fontSize: "26px",
    marginBottom: "15px"
  },

  leftText: {
    fontSize: "14px",
    marginBottom: "30px",
    lineHeight: "1.5"
  },

  leftButton: {
    backgroundColor: "transparent",
    border: "2px solid #fff",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  /* LADO DIREITO */
  right: {
    width: "60%",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },

  rightTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#333"
  },

  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "30px"
  },

  mainButton: {
    backgroundColor: "#ffc107",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "15px"
  },

  secondaryButton: {
    backgroundColor: "#e0e0e0",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
