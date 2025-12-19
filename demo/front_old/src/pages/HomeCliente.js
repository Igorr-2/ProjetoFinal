import { useEffect, useState } from "react";
import axios from "axios";

// Endpoint configurado no seu ProdutoController para o catálogo do cliente
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
      // O Spring Boot retorna um Array de objetos Produto
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar o catálogo:", error);
    } finally {
      setLoading(false);
    }
  };

  const adicionarAoCarrinho = (produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

    const itemExiste = carrinhoAtual.find(item => item.idProduto === produto.idProduto);

    let novoCarrinho;
    if (itemExiste) {
      novoCarrinho = carrinhoAtual.map(item =>
        item.idProduto === produto.idProduto 
          ? { ...item, quantidade: item.quantidade + 1 } 
          : item
      );
    } else {
      novoCarrinho = [...carrinhoAtual, { ...produto, quantidade: 1 }];
    }

    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  if (loading) return <p>Carregando delícias da cantina...</p>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>🍴 Cardápio da Cantina</h2>
        <p>Escolha seus produtos favoritos</p>
      </header>

      <div style={styles.grid}>
        {produtos.length === 0 ? (
          <p>Não há produtos disponíveis no momento.</p>
        ) : (
          produtos.map((p) => (
            <div key={p.idProduto} style={styles.card}>
              {p.imagemUrl && (
                <img src={p.imagemUrl} alt={p.nome} style={styles.img} />
              )}
              <div style={styles.info}>
                <h3>{p.nome}</h3>
                <p style={styles.descricao}>{p.descricao}</p>
                <div style={styles.footerCard}>
                  <span style={styles.preco}>R$ {p.preco.toFixed(2)}</span>
                  <button style={styles.btnComprar} onClick={() => adicionarAoCarrinho(p)}>Adicionar </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Estilos básicos para uma aparência melhor para o aluno
const styles = {
  container: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '30px' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
    gap: '20px' 
  },
  card: { 
    border: '1px solid #ddd', 
    borderRadius: '12px', 
    overflow: 'hidden', 
    background: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  img: { width: '100%', height: '180px', objectFit: 'cover' },
  info: { padding: '15px' },
  descricao: { fontSize: '14px', color: '#666', height: '40px', overflow: 'hidden' },
  footerCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' },
  preco: { fontSize: '18px', fontWeight: 'bold', color: '#2ecc71' },
  btnComprar: { 
    background: '#0a58ca', 
    color: 'white', 
    border: 'none', 
    padding: '8px 15px', 
    borderRadius: '5px', 
    cursor: 'pointer' 
  }
};