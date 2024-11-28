import Sabotador from "./Sabotador.js";
import Dev from "./Dev.js";
import Chat from "./Chat.js";
import Quiz from "./Quiz.js";

class Jogo {
  constructor() {
    this.alunos = [];
    this.jogadores = [];
    this.grupos = 6;
    this.chat = new Chat();
    this.timerVotacao = null;
    this.votacaoAtiva = false;    
    this.quizzes = new Quiz();
  }

  verificarNomeExistente(nome) {
    if (/\d/.test(nome)) {
      throw new Error("Nome não pode conter números. Escolha outro.");
    }

    const nomeExistente = this.alunos.some(
      (a) => a.nome.toLowerCase() === nome.toLowerCase()
    );
    if (nomeExistente) {
      throw new Error(`Aluno com nome ${nome} já existe. Escolha outro.`);
    }
  }

  verificarApelidoExistente(apelido) {
    const apelidoExistente = this.alunos.some(
      (a) => String(a.apelido) === String(apelido)
    );
    if (apelidoExistente) {
      throw new Error(`Aluno com apelido ${apelido} já existe. Escolha outro.`);
    }
  }

  adicionarAluno(aluno) {
    this.alunos.push(aluno);
  }

  mostrarAlunos(grupo = null, nome = null) {
    if (this.alunos.length === 0) {
      throw new Error("Não há alunos cadastrados.");
    }

    const alunosFiltrados = this.alunos.filter(
      (a) =>
        (!grupo || a.grupo == grupo) &&
        (!nome || a.nome.toLowerCase() === nome.toLowerCase())
    );

    if (alunosFiltrados.length === 0) {
      throw new Error("Nenhum aluno encontrado para os filtros especificados.");
    }

    const alunosAgrupados = alunosFiltrados.reduce((acc, aluno) => {
      const grupoKey = `Grupo ${aluno.grupo}`;
      if (!acc[grupoKey]) acc[grupoKey] = [];
      acc[grupoKey].push({
        Nome: aluno.nome,
        Apelido: aluno.apelido,
        EstaVivo: aluno.estaVivo,
        LocalAtual: aluno.localAtual,
      });
      return acc;
    }, {});

    const resultadoFinal = Object.entries(alunosAgrupados)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .reduce((acc, [grupo, alunos]) => {
        const quantidade = alunos.length;
        acc[`${grupo} com ${quantidade} aluno${quantidade > 1 ? "s" : ""}`] =
          alunos;
        return acc;
      }, {});

    const tabelaConsole = alunosFiltrados
      .sort((a, b) => {
        if (a.grupo === b.grupo) {
          return a.nome.localeCompare(b.nome);
        }
        return a.grupo - b.grupo;
      })
      .map((aluno) => ({
        Grupo: aluno.grupo,
        Nome: aluno.nome,
        Apelido: aluno.apelido,
        Senha: aluno.pegarSenha(),
        EstaVivo: aluno.estaVivo,
        LocalAtual: aluno.localAtual,
      }));

    console.table(tabelaConsole);

    return resultadoFinal;
  }

  removerAluno(nome) {
    const aluno = this.alunos.findIndex((a) => a.nome === nome);
    if (aluno === -1) {
      return null;
    }
    return this.alunos.splice(aluno, 1)[0];
  }

  // Método que retorna os dados de todos os jogadores
  mostrarJogadores(dados) {
    const tabelaComInstancia = dados.map((d) => { //Mapeia os dados de cada jogador
      const { // Desestrutura o objeto 'd' para extrair as propriedades especificadas
        grupo,
        nome,
        apelido,
        estaVivo,
        localAtual,
        tempoDesocupado,
        votos,
      } = d; //Define as propriedades que serão mostradas
      return {
        Grupo: grupo,
        Nome: nome,
        Apelido: apelido,
        Senha: d.pegarSenha(),
        LocalAtual: localAtual,
        Votos: votos,
        TempoDesocupado: tempoDesocupado,
        EstaVivo: estaVivo,
        Tipo: d.constructor.name,
      };
    });

    console.table(tabelaComInstancia); //Mostra os dados na tela
  }

  //Método que inicia o jogo
  iniciarJogo() {
    const grupoEscolhido = Math.floor(Math.random() * this.grupos) + 1; //Escolhe um grupo aleatório

    this.alunos.forEach((aluno) => {
      let jogador;

      if (aluno.grupo === grupoEscolhido) {
        jogador = new Sabotador(aluno); //Define o jogador como sabotador
      } else {
        jogador = new Dev(aluno); //Define o jogador como dev
      }

      this.jogadores.push(jogador); //Adiciona o jogador ao array de jogadores
    });

    this.mostrarJogadores(this.jogadores);
  }

  // Método que encontra o jogador pela sua senha
  encontrarJogadorPorSenha(senha) {
    const jogador = this.jogadores.find((j) => j.pegarSenha() === senha); //Encontra o jogador pela senha
    if (!jogador) {
      throw new Error("Senha inválida ou jogador não encontrado.");
    }
    return jogador;
  }

  //Método que retorna o papel que possui o voto do jogador
  verPapel(senha) {
    const jogador = this.encontrarJogadorPorSenha(senha); 
    if (!jogador) {
      throw new Error("Senha inválida ou jogador não encontrado.");
    }
    return jogador.mostrarPapel();
  }

  //Método que verifica se o jogador está vivo
  verificarSeEstaVivo(jogador) {
    if (!jogador.estaVivo) { /// Verifica se a propriedade 'estaVivo' do objeto 'jogador' é falsa
      throw new Error( // Lança um novo erro com uma mensagem se 'jogador.estaVivo' for falso
        `O jovem ${jogador.apelido} está eliminado 💀 e não pode mais jogar 😢`
      );
    }
    return jogador;
  }

  //Método que inicia a votação
  iniciarVotacao() {
    if (this.votacaoAtiva) { //Verifica se a votação já está em andamento
      throw new Error(
        "Votação já em andamento. Corra para o Auditório, discuta no Chat e decida seu voto antes de encerrar a votação!!!"
      );
    }

    this.votacaoAtiva = true;
    this.jogadores.forEach((j) => { 
      if (j.estaVivo) j.apelido += " - 🗳️"; //Verifica se o jogador está vivo e adiciona o emoji de votação
    });

    this.timerVotacao = setTimeout(() => this.encerrarVotacao(), 6 * 60 * 1000); //Define o tempo de votação
  }

  //Método que encerra a votação
  encerrarVotacao() {
    const maxVotos = Math.max(...this.jogadores.map((j) => j.votos)); //Define o número máximo de votos
    const maisVotados = this.jogadores.filter( //Filtra os jogadores que votaram o mesmo número de vezes
      (j) => j.votos === maxVotos && j.estaVivo //Verifica se o jogador está vivo
    );

    maisVotados.forEach((jogador) => {
      jogador.estaVivo = false;
    });

    this.jogadores.forEach((j) => { //Reseta os dados dos jogadores
      j.votos = 0; // Reseta os votos do jogador para 0
      j.apelido = j.apelido.replace(" - 🗳️", ""); // Remove o emoji de votação do apelido do jogador
      if (!j.estaVivo) // Verifica se o jogador não está vivo
        j.apelido = j.apelido.includes("💀") ? j.apelido : j.apelido + " - 💀"; // Adiciona o emoji de morte ao apelido do jogador se não já estiver presente
    });

    this.votacaoAtiva = false; //Define que a votação não está mais em andamento
    clearTimeout(this.timerVotacao); //O tempo da votação acaba
    this.timerVotacao = null; //Define que o tempo da votação não está mais em andamento
    this.chat.mensagens = []; 

    this.mostrarJogadores(this.jogadores);
  }
}

export default Jogo;
