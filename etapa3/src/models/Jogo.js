import Sabotador from "./Sabotador.js"; // Importa a classe Sabotador
import Dev from "./Dev.js"; // Importa a classe Dev
import Chat from "./Chat.js"; // Importa a classe Chat
import Quiz from "./Quiz.js"; // Importa a classe Quiz

class Jogo { // Define a classe Jogo
  constructor() {
    this.alunos = [];
    this.jogadores = [];
    this.grupos = 6;
    this.chat = new Chat();
    this.timerVotacao = null;
    this.votacaoAtiva = false;    
    this.quizzes = new Quiz();
  }
// Verifica se o nome do aluno já existe
  verificarNomeExistente(nome) {
    if (/\d/.test(nome)) { // Verifica se a string nome contém algum dígito usando uma expressão regular.
      throw new Error("Nome não pode conter números. Escolha outro."); // Se contiver um dígito, lança um erro com a mensagem: "Nome não pode conter números. Escolha outro."
    }

    const nomeExistente = this.alunos.some(
      (a) => a.nome.toLowerCase() === nome.toLowerCase()
    );
    if (nomeExistente) {
      throw new Error(`Aluno com nome ${nome} já existe. Escolha outro.`);
    }
  }
// Verifica se o apelido do aluno já existe
  verificarApelidoExistente(apelido) {
    const apelidoExistente = this.alunos.some(
      (a) => String(a.apelido) === String(apelido)
    );
    if (apelidoExistente) {
      throw new Error(`Aluno com apelido ${apelido} já existe. Escolha outro.`);
    }
  }
// Adiciona um aluno
  adicionarAluno(aluno) {
    this.alunos.push(aluno);
  }
// Mostra os alunos
  mostrarAlunos(grupo = null, nome = null) {
    if (this.alunos.length === 0) {
      throw new Error("Não há alunos cadastrados.");
    }
// Filtra os alunos
    const alunosFiltrados = this.alunos.filter(
      (a) =>
        (!grupo || a.grupo == grupo) &&
        (!nome || a.nome.toLowerCase() === nome.toLowerCase())
    );

    if (alunosFiltrados.length === 0) {
      throw new Error("Nenhum aluno encontrado para os filtros especificados.");
    }
// Agrupa os alunos
    const alunosAgrupados = alunosFiltrados.reduce((acc, aluno) => { // Usa a função reduce para agrupar os alunos filtrados em um objeto acumulador acc.
      const grupoKey = `Grupo ${aluno.grupo}`; // Cria uma chave para o grupo baseado na propriedade grupo de cada aluno.
      if (!acc[grupoKey]) acc[grupoKey] = []; // Se o grupo ainda não existir no objeto acumulador, cria um novo array para esse grupo.
      acc[grupoKey].push({ // Adiciona o aluno ao array do grupo correspondente.
        Nome: aluno.nome,
        Apelido: aluno.apelido,
        EstaVivo: aluno.estaVivo,
        LocalAtual: aluno.localAtual,
      });
      return acc; // Retorna o objeto acumulador para a próxima iteração.
    }, {}); // Inicializa o objeto acumulador como um objeto vazio.
// Ordena os alunos
    const resultadoFinal = Object.entries(alunosAgrupados) // Converte o objeto acumulador em um array de arrays, onde cada subarray contém a chave e o valor de cada propriedade do objeto.
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Ordena o array de arrays com base na chave de cada subarray. 
      .reduce((acc, [grupo, alunos]) => {
        const quantidade = alunos.length;
        acc[`${grupo} com ${quantidade} aluno${quantidade > 1 ? "s" : ""}`] = // Adiciona uma nova propriedade ao objeto final com a chave contendo o nome do grupo e a quantidade de alunos no grupo.
          alunos; 
        return acc;
      }, {});

    const tabelaConsole = alunosFiltrados
      .sort((a, b) => { // Ordena os alunos filtrados com base no grupo e no nome.
        if (a.grupo === b.grupo) {
          return a.nome.localeCompare(b.nome); // Se os grupos forem iguais, ordena os alunos pelo nome.
        }
        return a.grupo - b.grupo;
      })
      .map((aluno) => ({ // Mapeia os alunos filtrados para um novo array de objetos com as propriedades Grupo, Nome, Apelido, Senha, EstaVivo e LocalAtual.
        Grupo: aluno.grupo,
        Nome: aluno.nome,
        Apelido: aluno.apelido,
        Senha: aluno.pegarSenha(),
        EstaVivo: aluno.estaVivo,
        LocalAtual: aluno.localAtual,
      }));
// Exibe a tabela
    console.table(tabelaConsole);
// Retorna o resultado final
    return resultadoFinal;
  }
// Remove um aluno
  removerAluno(nome) {
    const aluno = this.alunos.findIndex((a) => a.nome === nome); // Procura o índice do aluno na lista this.alunos cujo nome corresponda ao nome fornecido.
    if (aluno === -1) {
      return null;
    }
    return this.alunos.splice(aluno, 1)[0]; ]; // Se o aluno for encontrado, remove-o da lista e retorna o objeto aluno removido.
  }

  mostrarJogadores(dados) {
    const tabelaComInstancia = dados.map((d) => {
      const {
        grupo,
        nome,
        apelido,
        estaVivo,
        localAtual,
        tempoDesocupado,
        votos,
      } = d;
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

    console.table(tabelaComInstancia);
  }

  iniciarJogo() {
    const grupoEscolhido = Math.floor(Math.random() * this.grupos) + 1;

    this.alunos.forEach((aluno) => {
      let jogador;

      if (aluno.grupo === grupoEscolhido) {
        jogador = new Sabotador(aluno);
      } else {
        jogador = new Dev(aluno);
      }

      this.jogadores.push(jogador);
    });

    this.mostrarJogadores(this.jogadores);
  }

  encontrarJogadorPorSenha(senha) {
    const jogador = this.jogadores.find((j) => j.pegarSenha() === senha);
    if (!jogador) {
      throw new Error("Senha inválida ou jogador não encontrado.");
    }
    return jogador;
  }

  verPapel(senha) {
    const jogador = this.encontrarJogadorPorSenha(senha);
    if (!jogador) {
      throw new Error("Senha inválida ou jogador não encontrado.");
    }
    return jogador.mostrarPapel();
  }

  verificarSeEstaVivo(jogador) {
    if (!jogador.estaVivo) {
      throw new Error(
        `O jovem ${jogador.apelido} está eliminado 💀 e não pode mais jogar 😢`
      );
    }
    return jogador;
  }

  iniciarVotacao() {
    if (this.votacaoAtiva) {
      throw new Error(
        "Votação já em andamento. Corra para o Auditório, discuta no Chat e decida seu voto antes de encerrar a votação!!!"
      );
    }

    this.votacaoAtiva = true;
    this.jogadores.forEach((j) => {
      if (j.estaVivo) j.apelido += " - 🗳️";
    });

    this.timerVotacao = setTimeout(() => this.encerrarVotacao(), 6 * 60 * 1000);
  }

  encerrarVotacao() {
    const maxVotos = Math.max(...this.jogadores.map((j) => j.votos));
    const maisVotados = this.jogadores.filter(
      (j) => j.votos === maxVotos && j.estaVivo
    );

    maisVotados.forEach((jogador) => {
      jogador.estaVivo = false;
    });

    this.jogadores.forEach((j) => {
      j.votos = 0;
      j.apelido = j.apelido.replace(" - 🗳️", "");
      if (!j.estaVivo)
        j.apelido = j.apelido.includes("💀") ? j.apelido : j.apelido + " - 💀";
    });

    this.votacaoAtiva = false;
    clearTimeout(this.timerVotacao);
    this.timerVotacao = null;
    this.chat.mensagens = [];

    this.mostrarJogadores(this.jogadores);
  }
}

export default Jogo;
