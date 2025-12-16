import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(dados);
  }, []);

  function atualizarQuantidade(id, qtd) {
    const novo = carrinho.map(item =>
      item.id_produto === id ? { ...item, quantidade: qtd } : item
    );
    setCarrinho(novo);
    localStorage.setItem("carrinho", JSON.stringify(novo));
  }

  function remover(id) {
    const novo = carrinho.filter(item => item.id_produto !== id);
    setCarrinho(novo);
    localStorage.setItem("carrinho", JSON.stringify(novo));
  }

  function finalizarCompra() {
    alert("Pedido realizado com sucesso!");
    localStorage.removeItem("carrinho");
    setCarrinho([]);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🛒 Carrinho</h1>

      {carrinho.map(item => (
        <div key={item.id_produto} style={itemStyle}>
          <strong>{item.nome}</strong>
          <input
            type="number"
            min="1"
            value={item.quantidade}
            onChange={e => atualizarQuantidade(item.id_produto, Number(e.target.value))}
          />
          <button onClick={() => remover(item.id_produto)}>❌</button>
        </div>
      ))}

      {carrinho.length > 0 && (
        <button style={btn} onClick={finalizarCompra}>
          Finalizar Compra
        </button>
      )}

      <br /><br />
      <Link to="/cliente">⬅ Voltar</Link>
    </div>
  );
}

const itemStyle = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginBottom: 10
};

const btn = {
  marginTop: 20,
  padding: 12,
  background: "#0d5bd7",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontWeight: "bold"
};
