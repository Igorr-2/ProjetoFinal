// FormCliente.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FormCliente() {
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enderecoId, setEnderecoId] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null); // Estado para gerenciar a edição
  const baseURL = "http://localhost:8080/clientes";

  const fetchClientes = async () => {
    try {
      const res = await axios.get(baseURL);
      setClientes(res.data);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações
    if (!nome || nome.length > 100) {
      alert("Nome inválido (máx 100 caracteres)");
      return;
    }
    if (!cpfCnpj || (cpfCnpj.length !== 11 && cpfCnpj.length !== 14)) {
      alert("CPF/CNPJ inválido (11 ou 14 dígitos)");
      return;
    }
    if (!email || email.length > 100) {
      alert("Email inválido (máx 100 caracteres)");
      return;
    }
    if (!telefone || telefone.length > 15) {
      alert("Telefone inválido (máx 15 caracteres)");
      return;
    }
    if (!enderecoId) {
      alert("Escolha um endereço válido");
      return;
    }

    const dados = {
      nome,
      cpf_cnpj: cpfCnpj,
      email,
      telefone,
      endereco_id: parseInt(enderecoId, 10),
    };

    try {
      if (clienteEditando) {
        // Lógica para EDIÇÃO (PUT)
        await axios.put(`${baseURL}/${clienteEditando.cliente_id}`, dados);
        alert("Cliente atualizado com sucesso!");
        setClienteEditando(null); // Sai do modo de edição
      } else {
        // Lógica para CADASTRO (POST)
        await axios.post(baseURL, dados);
        alert("Cliente cadastrado com sucesso!");
      }
      
      // Limpa os campos e atualiza a lista
      setNome("");
      setCpfCnpj("");
      setEmail("");
      setTelefone("");
      setEnderecoId("");
      fetchClientes();
    } catch (err) {
      console.error("Erro ao processar cliente:", err);
      alert("Falha ao processar cliente. Veja o console para detalhes.");
    }
  };

  const handleEdit = (cliente) => {
    // Preenche o formulário com os dados do cliente para edição
    setNome(cliente.nome);
    setCpfCnpj(cliente.cpf_cnpj);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEnderecoId(cliente.endereco_id);
    setClienteEditando(cliente); // Entra no modo de edição
  };

  const handleRemove = (clienteId) => {
    if (window.confirm("Tem certeza que deseja remover este cliente?")) {
      axios.delete(`${baseURL}/${clienteId}`)
        .then(() => {
          setClientes(clientes.filter(c => c.cliente_id !== clienteId));
          alert("Cliente removido com sucesso!");
        })
        .catch(err => {
          console.error("Erro ao remover cliente:", err);
          alert("Falha ao remover cliente. Veja o console para detalhes.");
        });
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      <p>📌 Cadastro e acesso às informações de clientes</p>

      {/* Formulário de Cadastro/Edição */}
      <h3>{clienteEditando ? "✏️ Editar Cliente" : "➕ Cadastrar Novo Cliente"}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            maxLength={100}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label>CPF/CNPJ:</label>
          <input
            type="text"
            value={cpfCnpj}
            maxLength={14}
            onChange={(e) => setCpfCnpj(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            maxLength={100}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            maxLength={15}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <div>
          <label>Endereço (ID):</label>
          <input
            type="number"
            value={enderecoId}
            onChange={(e) => setEnderecoId(e.target.value)}
          />
        </div>
        <button type="submit">{clienteEditando ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* Tabela de Consulta de Clientes */}
      <h3>🔍 Clientes Cadastrados</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço ID</th>
            <th>Editar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>Nenhum cliente cadastrado.</td>
            </tr>
          ) : (
            clientes.map((cliente) => (
              <tr key={cliente.cliente_id}>
                <td>{cliente.cliente_id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf_cnpj}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.endereco_id}</td>
                <td>
                  <button onClick={() => handleEdit(cliente)}>
                    ✏️
                  </button>
                </td>
                <td>
                  <button onClick={() => handleRemove(cliente.cliente_id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}