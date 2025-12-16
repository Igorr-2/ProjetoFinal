import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔐 Login
  function login(email, senha) {
    // ADMIN (cantina)
    if (email === "admin@cantina.com" && senha === "123") {
      setUser({ role: "ADMIN", email });
      return "ADMIN";
    }

    // 🧪 ALUNO TESTE
    if (email === "aluno@teste.com" && senha === "123") {
      setUser({ role: "CLIENTE", email });
      return "CLIENTE";
    }

    // 👩‍🎓 Alunos cadastrados (localStorage)
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const aluno = alunos.find(
      (a) => a.email === email && a.senha === senha
    );

    if (aluno) {
      setUser({ role: "CLIENTE", email: aluno.email });
      return "CLIENTE";
    }

    return null;
  }

  // 📝 Cadastro de aluno
  function cadastrarAluno(dadosAluno) {
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(dadosAluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, cadastrarAluno }}>
      {children}
    </AuthContext.Provider>
  );
}
