import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = 'http://localhost:8080/produtos/disponiveis';

export default function HomeCliente() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCatalogo();
  }, []);

  const carregarCatalogo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar o catálogo:", error);
    } finally {
      setLoading(false);
    }
  };

  // FUNÇÃO PARA ADICIONAR NO LOCALSTORAGE
  const adicionarAoCarrinho = (produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // Procura se o produto já está no carrinho
    const itemExiste = carrinhoAtual.find(item => item.idProduto === produto.idProduto);

    let novoCarrinho;
    if (itemExiste) {
      novoCarrinho = carrinhoAtual.map(item =>
        item.idProduto === produto.idProduto 
          ? { ...item, quantidade: item.quantidade + 1 } 
          : item
      );
    } else {
      // Adiciona novo item com quantidade inicial 1
      novoCarrinho = [...carrinhoAtual, { ...produto, quantidade: 1 }];
    }

    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  if (loading) return <p>Carregando catálogo...</p>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>🍴 Cardápio da Cantina</h2>
      </header>

      <div style={styles.grid}>
        {produtos.map((p) => (
          <div key={p.idProduto} style={styles.card}>
            {p.imagemUrl && <img src={p.imagemUrl} alt={p.nome} style={styles.img} />}
            <div style={styles.info}>
              <h3>{p.nome}</h3>
              <p>{p.descricao}</p>
              <div style={styles.footerCard}>
                <span style={styles.preco}>R$ {p.preco.toFixed(2)}</span>
                {/* VINCULANDO A FUNÇÃO AO CLIQUE */}
                <button style={styles.btnComprar} onClick={() => adicionarAoCarrinho(p)}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
