import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './perfilAtleta.css';
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface AtletaDetalhe {
  registroAtleta: number;
  nome: string;
  nomeCamisa: string;
  numeroCamisa: number;
  posicao: number;
  altura: number;
  saltoVertical: number;
  envergadura: number;
  peso: number;
  paisOrigem: string;
  estadoOrigem: string;
  cidadeOrigem: string;
  idade: number;
  equipe: string; // Assuming 'equipe' will come from the API
  dataNascimento: string; // Assuming 'dataNascimento' will come from the API
  naturalidade: string; // Assuming 'naturalidade' will come from the API
}

interface EstatisticaJogo {
  jogos_idJogo: number;
  minutosJogador: number;
  pontos: number;
  assistencias: number;
  rebotes: number;
  bloqueios: number;
  roubos: number;
  turnovers: number;
  faltasCometidas: number;
  arremessosConvertidos: number;
  arremessosTentados: number;
  lancesLivresConvertidos: number;
  lancesLivresTentados: number;
  bolasTresConvertidas: number;
  bolasTresTentadas: number;
}

function posicaoParaTexto(posicao: number): string {
  switch (posicao) {
    case 1:
      return 'Armador';
    case 2:
      return 'Ala-armador';
    case 3:
      return 'Ala';
    case 4:
      return 'Ala-pivô';
    case 5:
      return 'Pivô';
    default:
      return 'Posição desconhecida';
  }
}

function AtletaDetalhe() {
  const { registroAtleta } = useParams<{ registroAtleta: string }>();
  const [atleta, setAtleta] = useState<AtletaDetalhe | null>(null);
  const [estatisticas, setEstatisticas] = useState<EstatisticaJogo[]>([]);
  const navigate = useNavigate();

  // Fetch Atleta details
  useEffect(() => {
    if (!registroAtleta) return;

    fetch(`http://localhost:8000/atletas/${registroAtleta}`)
      .then(res => {
        if (!res.ok) throw new Error('Atleta não encontrado');
        return res.json();
      })
      .then(data => setAtleta(data))
      .catch(() => {
        alert('Atleta não encontrado');
        navigate('/atletas');
      });
  }, [registroAtleta, navigate]);

  // Fetch Estatisticas
  useEffect(() => {
    async function fetchEstatisticas() {
      try {
        const res = await fetch(`http://localhost:8000/atletas/${registroAtleta}/desempenho`);
        if (!res.ok) throw new Error('Estatísticas não encontradas');
        const data = await res.json();
        setEstatisticas(data);
      } catch (err) {
        console.error('Erro ao buscar estatísticas', err);
      }
    }
    if (registroAtleta) {
      fetchEstatisticas();
    }
  }, [registroAtleta]);

  const calcularMedia = (estats: EstatisticaJogo[]): number[] => {
    const total = estats.length;
    if (total === 0) return [0, 0, 0, 0, 0, 0];

    const soma = estats.reduce((acc, curr) => ({
      pontos: acc.pontos + curr.pontos,
      assistencias: acc.assistencias + curr.assistencias,
      rebotes: acc.rebotes + curr.rebotes,
      roubos: acc.roubos + curr.roubos,
      bloqueios: acc.bloqueios + curr.bloqueios,
      turnovers: acc.turnovers + curr.turnovers
    }), { pontos: 0, assistencias: 0, rebotes: 0, roubos: 0, bloqueios: 0, turnovers: 0 });

    return [
      +(soma.pontos / total).toFixed(1),
      +(soma.assistencias / total).toFixed(1),
      +(soma.rebotes / total).toFixed(1),
      +(soma.roubos / total).toFixed(1),
      +(soma.bloqueios / total).toFixed(1),
      +(soma.turnovers / total).toFixed(1)
    ];
  };

  const medias = calcularMedia(estatisticas);
  const mediaPontos = medias[0];
  const mediaRebotes = medias[2];
  const mediaAssistencias = medias[1];
  // Placeholder for Eficiencia - calculate based on actual formula if available
  const eficiencia = estatisticas.length > 0 ? (mediaPontos + mediaRebotes + mediaAssistencias - medias[5]).toFixed(1) : '0.0'; // Simple example

  const radarData = {
    labels: [
      'Pontos',
      'Assistências',
      'Rebotes',
      'Roubos',
      'Bloqueios',
      'Turnovers'
    ],
    datasets: [
      {
        label: 'Média por jogo',
        data: medias,
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      }
    ]
  };

  if (!atleta) {
    return <p>Carregando detalhes do atleta...</p>;
  }

  // Determine personal records dynamically
  const recordePontos = estatisticas.length > 0 ? Math.max(...estatisticas.map(s => s.pontos)) : 0;
  const recordeAssists = estatisticas.length > 0 ? Math.max(...estatisticas.map(s => s.assistencias)) : 0;
  const recordeRebotes = estatisticas.length > 0 ? Math.max(...estatisticas.map(s => s.rebotes)) : 0;
  const recorde3PC = estatisticas.length > 0 ? Math.max(...estatisticas.map(s => s.bolasTresConvertidas)) : 0;
  const recorde2PC = estatisticas.length > 0 ? Math.max(...estatisticas.map(s => s.arremessosConvertidos - s.bolasTresConvertidas)) : 0; // 2-point converted shots
  const recordeLLC = estatisticas.length > 0 ? Math.max(...estatisticas.map(s => s.lancesLivresConvertidos)) : 0;

  // Find the game where the record was set (simplified: just showing the value)
  const gameForRecordPontos = estatisticas.find(s => s.pontos === recordePontos)?.jogos_idJogo || '-';
  const gameForRecordRebotes = estatisticas.find(s => s.rebotes === recordeRebotes)?.jogos_idJogo || '-';
  const gameForRecordAssists = estatisticas.find(s => s.assistencias === recordeAssists)?.jogos_idJogo || '-';


  return (
    <div className="perfil-atleta-container">
      <div className="header-navigation">
        <button onClick={() => navigate('/atletas')}>← Voltar à lista</button>
      </div>

      <div className="top-bar">
        <div className="player-header">
          <span className="player-number">#{atleta.numeroCamisa}</span>
          <h1 className="player-name">{atleta.nomeCamisa}</h1>
        </div>
      </div>

      <div className="main-content">
        <div className="player-summary-stats">
          <div className="stat-box">
            <span className="stat-label">PONTOS</span>
            <span className="stat-value">{mediaPontos}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">REBOTES</span>
            <span className="stat-value">{mediaRebotes}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">ASSISTÊNCIAS</span>
            <span className="stat-value">{mediaAssistencias}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">EFICIÊNCIA</span>
            <span className="stat-value">{eficiencia}</span>
          </div>
        </div>

        <div className="player-details-grid">
          <div className="player-image-section">
            <img
              src={`/Imagens/Atletas/${atleta.registroAtleta}.png`}
              alt={atleta.nomeCamisa}
              className="player-photo"
              onError={e => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.dataset.fallback) {
                  target.src = "/Imagens/JogadorSemFoto.png";
                  target.alt = `Sem foto de ${atleta.nomeCamisa}`;
                  target.dataset.fallback = "true";
                }
              }}
            />
          </div>

          <div className="ficha-tecnica">
            <h2>FICHA TÉCNICA</h2>
            <div className="detail-row">
              <span>Nome</span>
              <span>{atleta.nome}</span>
              <span>Posição</span>
              <span>{posicaoParaTexto(atleta.posicao)}</span>
            </div>
            <div className="detail-row">
              <span>Equipe(s)</span>
              <span>{atleta.equipe || 'União Corinthians LDB'}</span> {/* Placeholder */}
              <span>Naturalidade</span>
              <span>{atleta.cidadeOrigem} ({atleta.estadoOrigem})</span>
            </div>
            <div className="detail-row">
              <span>Data de Nascimento</span>
              <span>{atleta.dataNascimento || '05/09/2004'}</span> {/* Placeholder */}
              <span>Altura / Peso</span>
              <span>{atleta.altura}m / {atleta.peso}Kg</span>
            </div>
          </div>

          <div className="perfil-records-container">
            <div className="perfil-na-temporada">
              <h2>PERFIL NA TEMPORADA</h2>
              {estatisticas.length > 0 ? (
                <div className="radar-chart-container">
                  <Radar data={radarData} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>
              ) : (
                <p>Sem estatísticas registradas para o perfil.</p>
              )}
            </div>

            <div className="recordes-pessoais">
              <h2>RECORDES PESSOAIS</h2>
              <div className="records-grid">
                <div className="record-item">
                  <span className="record-value">{recordePontos}</span>
                  <span className="record-label">PTS</span>
                  <span className="record-game">em {estatisticas.filter(s => s.pontos === recordePontos).length} partidas</span>
                </div>
                <div className="record-item">
                  <span className="record-value">{recordeRebotes}</span>
                  <span className="record-label">REB</span>
                  <span className="record-game">vs. Campo Mourão<br/>29/08/2024</span> {/* Placeholder */}
                </div>
                <div className="record-item">
                  <span className="record-value">{recordeAssists}</span>
                  <span className="record-label">ASS</span>
                  <span className="record-game">em {estatisticas.filter(s => s.assistencias === recordeAssists).length} partidas</span>
                </div>
                <div className="record-item">
                  <span className="record-value">{recorde3PC}</span>
                  <span className="record-label">3PC</span>
                  <span className="record-game">-</span>
                </div>
                <div className="record-item">
                  <span className="record-value">{recorde2PC}</span>
                  <span className="record-label">2PC</span>
                  <span className="record-game">em {estatisticas.filter(s => (s.arremessosConvertidos - s.bolasTresConvertidas) === recorde2PC).length} partidas</span>
                </div>
                <div className="record-item">
                  <span className="record-value">{recordeLLC}</span>
                  <span className="record-label">LLC</span>
                  <span className="record-game">vs. Corinthians<br/>13/07/2024</span> {/* Placeholder */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="desempenho-jogos">
          <h2>DESEMPENHO EM JOGOS</h2>
          {estatisticas.length === 0 ? (
            <p>Sem estatísticas de jogos registradas.</p>
          ) : (
            <table className="tabela-estatisticas">
              <thead>
                <tr>
                  <th>Jogo</th>
                  <th>Pontos</th>
                  <th>Assistências</th>
                  <th>Rebotes</th>
                  <th>Minutos</th>
                  <th>Bloqueios</th>
                  <th>Roubos</th>
                  <th>Turnovers</th>
                  <th>Faltas</th>
                  <th>2PC/T</th>
                  <th>3PC/T</th>
                  <th>LLC/T</th>
                </tr>
              </thead>
              <tbody>
                {estatisticas.map((jogo, index) => (
                  <tr key={index}>
                    <td>{jogo.jogos_idJogo}</td>
                    <td>{jogo.pontos}</td>
                    <td>{jogo.assistencias}</td>
                    <td>{jogo.rebotes}</td>
                    <td>{jogo.minutosJogador.toFixed(1)}</td>
                    <td>{jogo.bloqueios}</td>
                    <td>{jogo.roubos}</td>
                    <td>{jogo.turnovers}</td>
                    <td>{jogo.faltasCometidas}</td>
                    <td>{jogo.arremessosConvertidos - jogo.bolasTresConvertidas}/{jogo.arremessosTentados - jogo.bolasTresTentadas}</td>
                    <td>{jogo.bolasTresConvertidas}/{jogo.bolasTresTentadas}</td>
                    <td>{jogo.lancesLivresConvertidos}/{jogo.lancesLivresTentados}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AtletaDetalhe;