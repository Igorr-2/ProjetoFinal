import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/produtos";

export default function Estoque() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  
  // O estado deve refletir exatamente o Model do Java
  const [form, setForm] = useState({
    idProduto: null,
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    imagemUrl: ""
  });

  useEffect(() => {
    listarProdutos();
  }, []);

  async function listarProdutos() {
    try {
      const response = await axios.get(API_URL);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvarProduto(e) {
    e.preventDefault();

    // Validação básica
    if (!form.nome || !form.preco || !form.quantidade) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      if (form.idProduto) {
        // EDITAR (PUT)
        await axios.put(`${API_URL}/${form.idProduto}`, form);
      } else {
        // ADICIONAR (POST)
        // O Spring espera um JSON com chaves: nome, preco, imagemUrl (camelCase)
        await axios.post(API_URL, form);
      }
      
      limparForm();
      listarProdutos(); 
    } catch (error) {
      alert("Erro ao salvar produto. Verifique se todos os campos estão preenchidos corretamente.");
      console.error(error);
    }
  }

  function editarProduto(produto) {
    setForm(produto);
  }

  async function removerProduto(id) {
    if (window.confirm("Deseja realmente desativar este produto?")) {
      try {
        await axios.patch(`${API_URL}/${id}/desativar`);
        listarProdutos();
      } catch (error) {
        alert("Erro ao desativar produto.");
      }
    }
  }

  function limparForm() {
    setForm({
      idProduto: null,
      nome: "",
      descricao: "",
      preco: "",
      quantidade: "",
      imagemUrl: ""
    });
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <h1>📦 Controle de Estoque</h1>
        <p>Gerencie os produtos da cantina</p>
      </div>

      {/* FORMULÁRIO */}
      <form style={styles.form} onSubmit={salvarProduto}>
        {/* CORREÇÃO: name deve ser igual ao Java (camelCase) */}
        <input name="nome" placeholder="Nome do produto" value={form.nome} onChange={handleChange} />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
        <input name="preco" type="number" placeholder="Preço" value={form.preco} onChange={handleChange} />
        <input name="quantidade" type="number" placeholder="Quantidade" value={form.quantidade} onChange={handleChange} />
        
        {/* CORREÇÃO: Aqui estava imagem_url, mudei para imagemUrl */}
        <input name="imagemUrl" placeholder="URL da imagem" value={form.imagemUrl} onChange={handleChange} />

        <button type="submit" style={styles.btnPrimary}>
          {/* CORREÇÃO: idProduto ao invés de id_produto */}
          {form.idProduto ? "Salvar Alterações" : "Adicionar Produto"}
        </button>
      </form>

      {/* LISTAGEM */}
      <div style={styles.lista}>
        {produtos.map(produto => (
          // CORREÇÃO: idProduto
          <div key={produto.idProduto} style={{...styles.card, opacity: produto.ativo ? 1 : 0.6 }}>
            
            {/* CORREÇÃO: imagemUrl */}
            {produto.imagemUrl && (
              <img
                src={produto.imagemUrl}
                alt={produto.nome}
                style={styles.img}
              />
            )}

            <h3>{produto.nome}</h3>
            <p style={styles.desc}>{produto.descricao}</p>
            <p><strong>Preço:</strong> R$ {produto.preco}</p>
            <p><strong>Qtd:</strong> {produto.quantidade}</p>
            {!produto.ativo && <p style={{color: 'red', fontWeight: 'bold'}}>INATIVO</p>}

            <div style={styles.actions}>
              <button onClick={() => editarProduto(produto)} style={styles.btnEdit}>Editar</button>
              
              {/* CORREÇÃO: idProduto */}
              {produto.ativo && (
                <button onClick={() => removerProduto(produto.idProduto)} style={styles.btnDelete}>Desativar</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button style={styles.voltar} onClick={() => navigate("/admin")}>
        ← Voltar para Home Admin
      </button>

    </div>
  );
}

// ... (Mantenha o objeto styles igual ao que você já tem)
const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f2f2f2"
  },

  top: {
    background: "#0a58ca",
    color: "#fff",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "30px"
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "30px"
  },

  btnPrimary: {
    gridColumn: "1 / -1",
    background: "#f2b705",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  lista: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  img: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px"
  },

  desc: {
    fontSize: "14px",
    color: "#555"
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  btnEdit: {
    background: "#0a58ca",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  btnDelete: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  voltar: {
    marginTop: "40px",
    background: "transparent",
    border: "none",
    color: "#0a58ca",
    fontSize: "16px",
    cursor: "pointer"
  }
};