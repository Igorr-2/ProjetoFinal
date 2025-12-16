// Notas.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [numeroNota, setNumeroNota] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [idVenda, setIdVenda] = useState("");
  const [notaEditando, setNotaEditando] = useState(null); // Estado para gerenciar a edição

  const baseURL = "http://localhost:8080/notas";

  // Função para buscar as notas da API
  const fetchNotas = async () => {
    try {
      const res = await axios.get(baseURL);
      setNotas(res.data);
    } catch (err) {
      console.error("Erro ao buscar notas:", err);
    }
  };

  // Carrega as notas ao montar o componente
  useEffect(() => {
    fetchNotas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações
    if (!numeroNota) return alert("Informe o número da nota.");
    if (!dataEmissao) return alert("Informe a data de emissão.");
    if (!valorTotal || isNaN(valorTotal) || parseFloat(valorTotal) <= 0) return alert("Valor total inválido.");
    if (!idVenda) return alert("Informe o ID da venda.");

    const dados = {
      numero_nota: numeroNota,
      data_emissao: dataEmissao,
      valor_total: parseFloat(valorTotal),
      id_venda: idVenda,
    };

    try {
      if (notaEditando) {
        // Lógica para EDIÇÃO (PUT)
        await axios.put(`${baseURL}/${notaEditando.nota_id}`, dados);
        alert("Nota atualizada com sucesso!");
        setNotaEditando(null); // Sai do modo de edição
      } else {
        // Lógica para CADASTRO (POST)
        await axios.post(baseURL, dados);
        alert("Nota emitida com sucesso!");
      }

      // Limpa os campos e atualiza a lista
      setNumeroNota("");
      setDataEmissao("");
      setValorTotal("");
      setIdVenda("");
      fetchNotas();
    } catch (err) {
      console.error("Erro ao processar nota:", err);
      alert("Falha ao processar nota. Veja o console para detalhes.");
    }
  };

  const handleEdit = (nota) => {
    // Preenche o formulário com os dados da nota para edição
    setNumeroNota(nota.numero_nota);
    setDataEmissao(nota.data_emissao);
    setValorTotal(nota.valor_total);
    setIdVenda(nota.id_venda);
    setNotaEditando(nota); // Entra no modo de edição
  };

  const handleRemove = (notaId) => {
    if (window.confirm("Tem certeza que deseja remover esta nota?")) {
      axios.delete(`${baseURL}/${notaId}`)
        .then(() => {
          setNotas(notas.filter(n => n.nota_id !== notaId));
          alert("Nota removida com sucesso!");
        })
        .catch(err => {
          console.error("Erro ao remover nota:", err);
          alert("Falha ao remover nota. Veja o console para detalhes.");
        });
    }
  };

  return (
    <div>
      <h2>📌 Emissão de Pedidos e Notas</h2>
      
      {/* Formulário de Cadastro/Edição */}
      <h3>{notaEditando ? "✏️ Editar Nota" : "➕ Emitir Nova Nota"}</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Número da Nota:</label>
          <input
            type="text"
            value={numeroNota}
            onChange={(e) => setNumeroNota(e.target.value)}
          />
        </div>
        <div>
          <label>Data de Emissão:</label>
          <input
            type="date"
            value={dataEmissao}
            onChange={(e) => setDataEmissao(e.target.value)}
          />
        </div>
        <div>
          <label>Valor Total:</label>
          <input
            type="number"
            step="0.01"
            value={valorTotal}
            onChange={(e) => setValorTotal(e.target.value)}
          />
        </div>
        <div>
          <label>ID da Venda:</label>
          <input
            type="text"
            value={idVenda}
            onChange={(e) => setIdVenda(e.target.value)}
          />
        </div>
        <button type="submit">{notaEditando ? "Atualizar Nota" : "Emitir Nota"}</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* Tabela de consulta */}
      <h3>🔍 Notas Emitidas</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número Nota</th>
            <th>Data Emissão</th>
            <th>Valor Total</th>
            <th>ID Venda</th>
            <th>Editar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {notas.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Nenhuma nota emitida.
              </td>
            </tr>
          ) : (
            notas.map((nota) => (
              <tr key={nota.nota_id}>
                <td>{nota.nota_id}</td>
                <td>{nota.numero_nota}</td>
                <td>{nota.data_emissao}</td>
                <td>{nota.valor_total.toFixed(2)}</td>
                <td>{nota.id_venda}</td>
                <td>
                  <button onClick={() => handleEdit(nota)}>
                    ✏️
                  </button>
                </td>
                <td>
                  <button onClick={() => handleRemove(nota.nota_id)}>
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