import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Equipes.css';

interface Equipe {
  id: number;
  nome: string;
  sigla: string;
  cidade: string;
  estado: string;
  escudoUrl: string;
}

function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  fetch('http://localhost:8000/equipes')
    .then(res => res.json())
    .then(data => {
      console.log('Resposta da API /equipes:', data);

      // Verificação de tipo
      if (Array.isArray(data)) {
        setEquipes(data);
      } else {
        console.error("Resposta inesperada da API:", data);
        setEquipes([]); // evita travamentos
      }
    })
    .catch((err) => {
      console.error("Erro ao buscar equipes:", err);
      setEquipes([]);
    });
}, []);


  return (
    <div className="equipes-container">
      <h1>Equipes Participantes</h1>
      <div className="lista-equipes">
        {equipes.map(eq => (
          <div
            key={eq.id}
            className="card-equipe"
            onClick={() => navigate(`/equipe/${eq.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/equipe/${eq.id}`); }}
          >
            <img
              src={eq.escudoUrl}
              alt={`Escudo ${eq.nome}`}
              className="escudo-equipe"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = '/Imagens/TimeSemFoto.png';
              }}
            />
            <div className="info-equipe">
              <h2>{eq.nome} ({eq.sigla})</h2>
              <p>{eq.cidade} - {eq.estado}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Equipes;
