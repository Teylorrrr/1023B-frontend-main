import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Times.css";

interface Equipe {
  id: number;
  nome: string;
  sigla: string;
  escudoUrl: string;
}

const Times: React.FC = () => {
  const [times, setTimes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/times")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar times: " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTimes(data);
          setError(null);
        } else {
          setError("Resposta inesperada da API");
          setTimes([]);
        }
      })
      .catch((err) => {
        setError(err.message || "Erro desconhecido");
        setTimes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Carregando times...</div>;
  }

  if (error) {
    return <div className="error">Erro: {error}</div>;
  }

  if (times.length === 0) {
    return <div className="no-data">Nenhuma equipe encontrada.</div>;
  }

  return (
    <div className="times-container">
      <h1 className="title">Times Participantes</h1>
      <div className="lista-times">
        {times.map((eq) => (
          <div
            key={eq.id}
            className="card-equipe"
            onClick={() => navigate(`/times/${eq.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(`/times/${eq.id}`);
            }}
            aria-label={`Ver detalhes da equipe ${eq.nome}`}
          >
            <img
              src={eq.escudoUrl}
              alt={`Escudo da equipe ${eq.nome}`}
              className="escudo"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/Imagens/TimeSemFoto.png";
              }}
            />
            <div className="info-equipe">
              <h2>
                {eq.nome} ({eq.sigla})
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Times;
