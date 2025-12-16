import { useState } from "react";
import Fluxo from "./Financeiro.filhos/Fluxo";
import Relatorios from "./Financeiro.filhos/Relatorios";

export default function Financeiro() {
  const [tela, setTela] = useState(null); // null = menu principal
  const [fluxos, setFluxos] = useState([]); // Estado do fluxo de caixa

  return (
    <div>
      <h1>📊 Financeiro</h1>

      {tela === null && (
        <nav className="sub-menu">
          <button onClick={() => setTela("fluxo")}>Fluxo de Caixa</button>
          <button onClick={() => setTela("relatorios")}>Relatórios Contábeis</button>
        </nav>
      )}

      {tela !== null && (
        <div>
          <button onClick={() => setTela(null)}>⬅ Voltar</button>

          {tela === "fluxo" && <Fluxo fluxos={fluxos} setFluxos={setFluxos} />}
          {tela === "relatorios" && <Relatorios fluxos={fluxos} />}
        </div>
      )}
    </div>
  );
}
