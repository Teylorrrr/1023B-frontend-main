import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PerfilTime.css";

interface Time {
  id: number;
  nome: string;
  sigla: string;
  cidade: string;
  estado: string;
  escudoUrl: string;
  dataCriacao: string;
}

interface Atleta {
  registroAtleta: number;
  numeroCamisa: number;
  nomeCamisa: string;
  altura: number;
  peso: number;
  posicao: number;
  idade: number;
}

function posicaoParaTexto(posicao: number): string {
  switch (posicao) {
    case 1:
      return "Armador";
    case 2:
      return "Ala-armador";
    case 3:
      return "Ala";
    case 4:
      return "Ala-pivô";
    case 5:
      return "Pivô";
    default:
      return "Posição desconhecida";
  }
}

const PerfilTime: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [time, setTime] = useState<Time | null>(null);
  const [loadingTime, setLoadingTime] = useState(true);
  const [errorTime, setErrorTime] = useState<string | null>(null);

  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [loadingAtletas, setLoadingAtletas] = useState(true);
  const [errorAtletas, setErrorAtletas] = useState<string | null>(null);

useEffect(() => {
  if (!id) {
    setErrorTime("ID do time não informado.");
    setLoadingTime(false);
    return;
  }

  // Buscar dados do time
  setLoadingTime(true);
  fetch(`http://localhost:8000/times/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Erro ao buscar time: ${res.statusText}`);
      return res.json();
    })
    .then((data) => {
      if (!data || !data.id) throw new Error("Time não encontrado ou dados inválidos");
      setTime(data);
      setErrorTime(null);
    })
    .catch((err) => {
      setErrorTime(err.message || "Erro desconhecido");
      setTime(null);
    })
    .finally(() => setLoadingTime(false));

  // Buscar atletas somente do time especificado
  setLoadingAtletas(true);
  fetch(`http://localhost:8000/atletas/time/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao buscar atletas do time");
      return res.json();
    })
    .then((data) => {
      setAtletas(data);
      setErrorAtletas(null);
    })
    .catch((err) => {
      setErrorAtletas(err.message || "Erro desconhecido");
      setAtletas([]);
    })
    .finally(() => setLoadingAtletas(false));
}, [id]);


  if (loadingTime) return <div className="loading">Carregando time...</div>;
  if (errorTime)
    return (
      <div className="error">
        Erro: {errorTime}{" "}
        <button onClick={() => navigate(-1)} className="btn-voltar">
          Voltar
        </button>
      </div>
    );
  if (!time)
    return (
      <div className="no-data">
        Time não encontrado.{" "}
        <button onClick={() => navigate(-1)} className="btn-voltar">
          Voltar
        </button>
      </div>
    );

  return (
    <div className="perfil-time-container">
     <button
  onClick={() => navigate("/times")}
  className="btn-voltar"
>
  ← Voltar
</button>


      <div className="card-time">
        <img
          src={time.escudoUrl || "/Imagens/TimeSemFoto.png"}
          alt={`Escudo do time ${time.nome}`}
          className="escudo-time"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/Imagens/TimeSemFoto.png";
          }}
        />
        <h1>
          {time.nome} ({time.sigla})
        </h1>
        <p>
          <strong>Cidade:</strong> {time.cidade} <br />
          <strong>Estado:</strong> {time.estado} <br />
          <strong>Data de Criação:</strong>{" "}
          {time.dataCriacao
            ? new Date(time.dataCriacao).toLocaleDateString("pt-BR")
            : "Data não informada"}
        </p>
      </div>

      <section className="atletas-time">
        <h2>Atletas do time</h2>
        {loadingAtletas && <p>Carregando atletas...</p>}
        {errorAtletas && <p className="error">{errorAtletas}</p>}
        {!loadingAtletas && !errorAtletas && atletas.length === 0 && (
          <p>Não há atletas cadastrados para este time.</p>
        )}

        <div className="container-atletas">
          {atletas.map((atleta) => (
            <div
              key={atleta.registroAtleta}
              className="card-atleta"
              onClick={() => navigate(`/atleta/${atleta.registroAtleta}`)}
            >
              <img
                src={`/Imagens/Atletas/${atleta.registroAtleta}.png`}
                alt={atleta.nomeCamisa}
                className="foto-atleta"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.dataset.fallback) {
                    target.src = "/Imagens/JogadorSemFoto.png";
                    target.alt = `Sem foto de ${atleta.nomeCamisa}`;
                    target.dataset.fallback = "true";
                  }
                }}
              />
              <div className="info-atleta">
                <h3>
                  {atleta.nomeCamisa} #{atleta.numeroCamisa}
                </h3>
                {atleta.altura !== undefined && <p><strong>Altura:</strong> {atleta.altura} m</p>}
                {atleta.peso !== undefined && <p><strong>Peso:</strong> {atleta.peso} kg</p>}
                {atleta.idade !== undefined && <p><strong>Idade:</strong> {atleta.idade} anos</p>}
                {atleta.posicao !== undefined && <p><strong>Posição:</strong> {posicaoParaTexto(atleta.posicao)}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PerfilTime;
