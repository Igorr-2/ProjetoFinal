import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const role = login(email, senha);

    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "CLIENTE") {
      navigate("/cliente");
    } else {
      setErro("Email ou senha inválidos");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Lado esquerdo */}
        <div style={styles.left}>
          <h2 style={styles.brand}>Cantina</h2>
          <p style={styles.subtitle}>Bem-vindo de volta</p>

          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
        </div>

        {/* Lado direito */}
        <div style={styles.right}>
          <h2 style={styles.title}>Acesse sua conta</h2>
          <p style={styles.description}>
            Entre com seu email e senha
          </p>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.primaryButton}>
              Entrar
            </button>
          </form>

          {erro && <p style={styles.error}>{erro}</p>}
        </div>
      </div>
    </div>
  );
}

/* =======================
   ESTILOS
======================= */

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  card: {
    width: "850px",
    height: "420px",
    background: "#fff",
    borderRadius: "12px",
    display: "flex",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    overflow: "hidden"
  },

  left: {
    width: "35%",
    background: "#0a58ca",
    color: "#fff",
    padding: "40px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  brand: {
    fontSize: "26px",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "30px"
  },

  secondaryButton: {
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  right: {
    width: "65%",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  title: {
    fontSize: "24px",
    marginBottom: "5px"
  },

  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "25px"
  },

  form: {
    display: "flex",
    flexDirection: "column"
  },

  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  primaryButton: {
    background: "#ffcc4d",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  error: {
    marginTop: "10px",
    color: "red",
    fontSize: "14px"
  }
};
