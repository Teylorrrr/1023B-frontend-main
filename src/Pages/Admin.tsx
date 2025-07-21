import React, { useState } from "react";

interface TimeForm {
  nome: string;
  sigla: string;
  cidade: string;
  estado: string;
  dataCriacao: string;
  escudoUrl?: string;
}

interface AtletaForm {
  registro: number;
  nome: string;
  nomeCamisa: string;
  numeroCamisa: number;
  posicao: number;
  altura: number;
  peso: number;
  idade: number;
  paisOrigem?: string;
  estadoOrigem?: string;
  cidadeOrigem?: string;
  saltoVertical?: number;
  envergadura?: number;
  dataNascimento?: string;
  imagemUrl?: string;  // campo novo para imagem do atleta
}

const Admin: React.FC = () => {
  // Estados do formulário de Time
  const [time, setTime] = useState<TimeForm>({
    nome: "",
    sigla: "",
    cidade: "",
    estado: "",
    dataCriacao: "",
    escudoUrl: "",
  });
  const [msgTime, setMsgTime] = useState<string | null>(null);

  // Estados do formulário de Atleta
  const [atleta, setAtleta] = useState<AtletaForm>({
    registro: 0,
    nome: "",
    nomeCamisa: "",
    numeroCamisa: 0,
    posicao: 1,
    altura: 0,
    peso: 0,
    idade: 0,
    imagemUrl: "", // inicializa vazio
  });
  const [msgAtleta, setMsgAtleta] = useState<string | null>(null);

  // Função para enviar cadastro de Time
  async function cadastrarTime(e: React.FormEvent) {
    e.preventDefault();
    setMsgTime(null);
    try {
      const res = await fetch("http://localhost:8000/times", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(time),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensagem || "Erro ao cadastrar time");
      setMsgTime("Time cadastrado com sucesso!");
      setTime({ nome: "", sigla: "", cidade: "", estado: "", dataCriacao: "", escudoUrl: "" });
    } catch (error: any) {
      setMsgTime(error.message || "Erro desconhecido");
    }
  }

  // Função para enviar cadastro de Atleta
  async function cadastrarAtleta(e: React.FormEvent) {
    e.preventDefault();
    setMsgAtleta(null);
    try {
      const res = await fetch("http://localhost:8000/atletas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registro: atleta.registro,
          nome: atleta.nome,
          nomeCamisa: atleta.nomeCamisa,
          numeroCamisa: atleta.numeroCamisa,
          posicao: atleta.posicao,
          altura: atleta.altura,
          peso: atleta.peso,
          idade: atleta.idade,
          paisOrigem: atleta.paisOrigem || null,
          estadoOrigem: atleta.estadoOrigem || null,
          cidadeOrigem: atleta.cidadeOrigem || null,
          saltoVertical: atleta.saltoVertical || null,
          envergadura: atleta.envergadura || null,
          dataNascimento: atleta.dataNascimento || null,
          imagemUrl: atleta.imagemUrl || null, // envia a imagem aqui
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensagem || "Erro ao cadastrar atleta");
      setMsgAtleta("Atleta cadastrado com sucesso!");
      setAtleta({
        registro: 0,
        nome: "",
        nomeCamisa: "",
        numeroCamisa: 0,
        posicao: 1,
        altura: 0,
        peso: 0,
        idade: 0,
        imagemUrl: "", // reseta o campo da imagem
      });
    } catch (error: any) {
      setMsgAtleta(error.message || "Erro desconhecido");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>Cadastro</h1>

      {/* Formulário para cadastro de Time */}
      <section>
        <h2>Cadastrar Time</h2>
        <form onSubmit={cadastrarTime}>
          <input
            type="text"
            placeholder="Nome"
            value={time.nome}
            onChange={(e) => setTime({ ...time, nome: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Sigla"
            value={time.sigla}
            onChange={(e) => setTime({ ...time, sigla: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            value={time.cidade}
            onChange={(e) => setTime({ ...time, cidade: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Estado"
            value={time.estado}
            onChange={(e) => setTime({ ...time, estado: e.target.value })}
            required
          />
          <input
            type="date"
            placeholder="Data de Criação"
            value={time.dataCriacao}
            onChange={(e) => setTime({ ...time, dataCriacao: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="URL do Escudo (opcional)"
            value={time.escudoUrl}
            onChange={(e) => setTime({ ...time, escudoUrl: e.target.value })}
          />
          <button type="submit">Cadastrar Time</button>
        </form>
        {msgTime && <p>{msgTime}</p>}
      </section>

      <hr />

      {/* Formulário para cadastro de Atleta */}
      <section>
        <h2>Cadastrar Atleta</h2>
        <form onSubmit={cadastrarAtleta}>
          <input
            type="number"
            placeholder="Registro (ID)"
            value={atleta.registro || ""}
            onChange={(e) => setAtleta({ ...atleta, registro: Number(e.target.value) })}
            required
          />
          <input
            type="text"
            placeholder="Nome"
            value={atleta.nome}
            onChange={(e) => setAtleta({ ...atleta, nome: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Nome na Camisa"
            value={atleta.nomeCamisa}
            onChange={(e) => setAtleta({ ...atleta, nomeCamisa: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Número da Camisa"
            value={atleta.numeroCamisa || ""}
            onChange={(e) => setAtleta({ ...atleta, numeroCamisa: Number(e.target.value) })}
            required
          />
          <select
            value={atleta.posicao}
            onChange={(e) => setAtleta({ ...atleta, posicao: Number(e.target.value) })}
            required
          >
            <option value={1}>Armador</option>
            <option value={2}>Ala-armador</option>
            <option value={3}>Ala</option>
            <option value={4}>Ala-pivô</option>
            <option value={5}>Pivô</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Altura (m)"
            value={atleta.altura || ""}
            onChange={(e) => setAtleta({ ...atleta, altura: Number(e.target.value) })}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Peso (kg)"
            value={atleta.peso || ""}
            onChange={(e) => setAtleta({ ...atleta, peso: Number(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Idade"
            value={atleta.idade || ""}
            onChange={(e) => setAtleta({ ...atleta, idade: Number(e.target.value) })}
            required
          />
          {/* Campos opcionais */}
          <input
            type="text"
            placeholder="País de Origem (opcional)"
            value={atleta.paisOrigem || ""}
            onChange={(e) => setAtleta({ ...atleta, paisOrigem: e.target.value })}
          />
          <input
            type="text"
            placeholder="Estado de Origem (opcional)"
            value={atleta.estadoOrigem || ""}
            onChange={(e) => setAtleta({ ...atleta, estadoOrigem: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cidade de Origem (opcional)"
            value={atleta.cidadeOrigem || ""}
            onChange={(e) => setAtleta({ ...atleta, cidadeOrigem: e.target.value })}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Salto Vertical (opcional)"
            value={atleta.saltoVertical || ""}
            onChange={(e) => setAtleta({ ...atleta, saltoVertical: Number(e.target.value) })}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Envergadura (opcional)"
            value={atleta.envergadura || ""}
            onChange={(e) => setAtleta({ ...atleta, envergadura: Number(e.target.value) })}
          />
          <input
            type="date"
            placeholder="Data de Nascimento (opcional)"
            value={atleta.dataNascimento || ""}
            onChange={(e) => setAtleta({ ...atleta, dataNascimento: e.target.value })}
          />
          {/* Campo imagem do atleta */}
          <input
            type="text"
            placeholder="URL da Imagem do Atleta (opcional)"
            value={atleta.imagemUrl || ""}
            onChange={(e) => setAtleta({ ...atleta, imagemUrl: e.target.value })}
          />
          <button type="submit">Cadastrar Atleta</button>
        </form>
        {msgAtleta && <p>{msgAtleta}</p>}
      </section>
    </div>
  );
};

export default Admin;
