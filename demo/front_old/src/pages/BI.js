import { useState } from "react";
import Gerenciais from "./BI.filhos/Gerenciais";
import Dashboards from "./BI.filhos/Dashboards";

function BI() {
  const [tela, setTela] = useState(null); // null = mostra menu

  return (
    <div>
      <h1>BI e Relatórios</h1>

      {tela === null && (
        <nav className="sub-menu">
          <button onClick={() => setTela("gerenciais")}>
            Relatórios Gerenciais e Operacionais
          </button>
          <button onClick={() => setTela("dashboards")}>
            Dashboards em tempo real
          </button>
        </nav>
      )}

      {tela !== null && (
        <div>
          <button onClick={() => setTela(null)}>⬅ Voltar</button>

          {tela === "gerenciais" && <Gerenciais />}
          {tela === "dashboards" && <Dashboards />}
        </div>
      )}
    </div>
  );
}

export default BI;
