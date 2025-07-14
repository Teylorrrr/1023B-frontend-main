// === PerfilAtleta.tsx ===
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import './perfilAtleta.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Atleta {
  registroAtleta: number;
  nome: string;
  nomeCamisa: string;
  numeroCamisa: number;
  altura: number;
  peso: number;
  posicao: string;
  idade: number;
  cidadeOrigem: string;
  estadoOrigem: string;
  paisOrigem: string;
}

interface Desempenho {
  medias: {
    pontos: number;
    rebotes: number;
    assistencias: number;
    eficiencia: number;
  };
  recordes: {
    [key: string]: {
      valor: number;
      data: string;
      adversario: string;
    };
  };
}

function AtletaDetalhe() {
  const { registroAtleta } = useParams<{ registroAtleta: string }>();
  const [atleta, setAtleta] = useState<Atleta | null>(null);
  const [desempenho, setDesempenho] = useState<Desempenho | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!registroAtleta) return;

    fetch(`http://localhost:8000/atletas/${registroAtleta}`)
      .then(res => res.json())
      .then(data => setAtleta(data));

    fetch(`http://localhost:8000/atletas/${registroAtleta}/desempenho`)
      .then(res => res.json())
      .then(data => {
        if (data?.medias) setDesempenho(data);
      });
  }, [registroAtleta]);

  if (!atleta || !desempenho) return <p>Carregando atleta...</p>;

  const dataRadar = {
    labels: ['Pontos', 'Rebotes', 'Assistências', 'Eficiência'],
    datasets: [
      {
        label: 'Média na Temporada',
        data: [
          desempenho.medias.pontos,
          desempenho.medias.rebotes,
          desempenho.medias.assistencias,
          desempenho.medias.eficiencia
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="perfil-container">
      <button className="voltar" onClick={() => navigate('/atletas')}>← Voltar</button>

      <h2 className="titulo-nome">
        #{atleta.numeroCamisa} {atleta.nomeCamisa}
      </h2>

      <div className="estatisticas">
        <div className="stat-box"><span className="stat-num">{desempenho.medias.pontos}</span>Pontos</div>
        <div className="stat-box"><span className="stat-num">{desempenho.medias.rebotes}</span>Rebotes</div>
        <div className="stat-box"><span className="stat-num">{desempenho.medias.assistencias}</span>Assistências</div>
        <div className="stat-box"><span className="stat-num">{desempenho.medias.eficiencia}</span>Eficiência</div>
      </div>

      <div className="ficha">
        <p><strong>Nome:</strong> {atleta.nome}</p>
        <p><strong>Data de Nascimento:</strong> {new Date().getFullYear() - atleta.idade}</p>
        <p><strong>Altura / Peso:</strong> {atleta.altura} m / {atleta.peso} kg</p>
        <p><strong>Posição:</strong> {atleta.posicao}</p>
        <p><strong>Naturalidade:</strong> {atleta.cidadeOrigem} - {atleta.estadoOrigem}</p>
      </div>

      <h3>Perfil na Temporada</h3>
      <div className="grafico">
        <Radar data={dataRadar} />
      </div>

      <h3>Recordes Pessoais</h3>
      <div className="recordes">
        {Object.entries(desempenho.recordes).map(([chave, valor]) => (
          <div key={chave} className="recorde-box">
            <span className="recorde-valor">{valor.valor}</span>
            <p className="recorde-tipo">{chave.toUpperCase()}</p>
            <p className="recorde-info">{valor.adversario}</p>
            <p className="recorde-info">{new Date(valor.data).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AtletaDetalhe;
