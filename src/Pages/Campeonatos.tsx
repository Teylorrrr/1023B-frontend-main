import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './perfilAtleta.css'; // se quiser estilizar essa página

interface AtletaDetalhe {
  registroAtleta: number;
  nome: string;
  nomeCamisa: string;
  numeroCamisa: number;
  posicao: string;
  altura: number;
  peso: number;
  paisOrigem: string;
  estadoOrigem: string;
  cidadeOrigem: string;
  idade: number;
}

function AtletaDetalhe() {
  const { registroAtleta } = useParams<{ registroAtleta: string }>();
  const [atleta, setAtleta] = useState<AtletaDetalhe | null>(null);
  const navigate = useNavigate();

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

  if (!atleta) return <p>Carregando detalhes do atleta...</p>;

  return (
    <div className="detalhe-atleta">
      <button onClick={() => navigate('/atletas')}>← Voltar à lista</button>
      <h1>{atleta.nome} ({atleta.nomeCamisa})</h1>
      <img src={`/imagens/atletas/${atleta.registroAtleta}.png`} alt={atleta.nomeCamisa} />
      <p><b>Número:</b> {atleta.numeroCamisa}</p>
      <p><b>Posição:</b> {atleta.posicao}</p>
      <p><b>Idade:</b> {atleta.idade} anos</p>
      <p><b>Altura:</b> {atleta.altura} m</p>
      <p><b>Peso:</b> {atleta.peso} kg</p>
      <p><b>Origem:</b> {atleta.cidadeOrigem} - {atleta.estadoOrigem} - {atleta.paisOrigem}</p>
    </div>
  );
}

export default AtletaDetalhe;