import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import AuthChoice from "./pages/AuthChoice";
import Login from "./pages/Login";
import CadastroAluno from "./pages/CadastroAluno";
import HomeAdmin from "./pages/HomeAdmin";
import HomeCliente from "./pages/HomeCliente";
import Estoque from "./pages/Estoque";
import Carrinho from "./pages/Carrinho";
import TesteConexao from "./pages/TesteConexao";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthChoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroAluno />} />

          {/* ADMIN */}
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/estoque" element={<Estoque />} />

          {/* CLIENTE */}
          <Route path="/cliente" element={<HomeCliente />} />
          <Route path="/cliente/carrinho" element={<Carrinho />} />

          <Route path="/teste" element={<TesteConexao />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

