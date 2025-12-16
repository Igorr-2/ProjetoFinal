import { useState } from 'react';
import api from './api';

export default function TesteConexao() {
  const [status, setStatus] = useState("Aguardando teste...");

  async function testar() {
    setStatus("Conectando...");
    try {
      // Tenta acessar qualquer endpoint público (ex: lista de produtos)
      const response = await api.get('/produtos');
      
      if (response.status === 200) {
        setStatus("✅ Conectado com sucesso ao Spring Boot!");
      }
    } catch (error) {
      if (!error.response) {
        // Erro de rede: Servidor desligado ou URL errada
        setStatus("❌ Erro de Rede: O backend está desligado ou o CORS bloqueou o acesso.");
      } else {
        // O servidor respondeu, mas com erro (404, 500, etc)
        setStatus(`⚠️ Servidor respondeu com erro ${error.response.status}`);
      }
      console.error("Detalhes do erro:", error.toJSON());
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>Status da Conexão:</h3>
      <p><strong>{status}</strong></p>
      <button onClick={testar}>Testar Conexão agora</button>
    </div>
  );
}