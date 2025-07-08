import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Atletas.css'

interface Atleta {
  registroAtleta: number
  numeroCamisa: number
  nomeCamisa: string
  altura: number
  peso: number
  posicao: string
  idade: number
}

function Atletas() {
  const [atletas, setAtletas] = useState<Atleta[]>([])
  const [mensagem, setMensagem] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const buscarAtletas = async () => {
      try {
        const resposta = await fetch("http://localhost:8000/atletas")
        if (resposta.status === 200) {
          const dados = await resposta.json()
          setAtletas(dados)
          setMensagem("")
        } else {
          const erro = await resposta.json()
          setMensagem(erro.mensagem || "Erro ao carregar atletas")
        }
      } catch (erro) {
        setMensagem("Erro ao conectar com o servidor")
      }
    }

    buscarAtletas()
  }, [])
return (
  <>
    <h1>Draft 2025</h1>
    <div className="container">
      <div className="draft">
        <h2>Draft 2025</h2>
        <p>
          O Draft 2025 está programado para o dia 15 de Dezembro de 2025. As equipes estão se preparando para selecionar novos talentos que irão brilhar na liga.
        </p>
      </div>
         <img src="/Imagens/Draft2025.png" alt="Draft2025" className="Draft2025" />
    </div>

    <h1>Principais candidatos ao Draft</h1>
    {mensagem && <p className="mensagem">{mensagem}</p>}

    <div className="container-atletas">
      {Array.isArray(atletas) && atletas.length > 0 ? (
        atletas.map(atleta => (
        <div key={atleta.registroAtleta} className="card-atleta" onClick={() => navigate(`/atleta/${atleta.registroAtleta}`)}>

  <img
    src={`/Imagens/Atletas/${atleta.registroAtleta}.png`}
    alt={atleta.nomeCamisa}
    className="foto-atleta"
    onError={(e) => {
      const target = e.currentTarget as HTMLImageElement
      if (!target.dataset.fallback) {
        target.src = "/Imagens/JogadorSemFoto.png"
        target.alt = `Sem foto de ${atleta.nomeCamisa}`
        target.dataset.fallback = "true"
      }
    }}
  />
  <div className="info-atleta">
    <h3>{atleta.nomeCamisa} #{atleta.numeroCamisa}</h3>
    {atleta.altura !== undefined && <p><strong>Altura:</strong> {atleta.altura} m</p>}
    {atleta.peso !== undefined && <p><strong>Peso:</strong> {atleta.peso} kg</p>}
    {atleta.idade !== undefined && <p><strong>Idade:</strong> {atleta.idade} anos</p>}
    {atleta.posicao && <p><strong>Posição:</strong> {atleta.posicao}</p>}
  </div>

</div>

        ))
      ) : (
        <p>Carregando atletas...</p>
      )}
    </div>
  </>
)
}

export default Atletas
