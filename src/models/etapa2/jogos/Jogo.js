// Objetivo: Definir a classe Jogos.
class Jogo {
    constructor(alunos, jogadores, grupos, chat) {
        this.alunos = alunos;
        this.jogadores = jogadores;
        this.grupos = grupos;
        this.chat = null;
    }

    generateId() {
        return Math.floor(Math.random() * 999) + 1;
    }

    mostrarAlunos() {
        return this.alunos;
    }

    mostrarJogadores() {
    // Método que retorna o nome e a turma de cada jogador do array de jogadores
        return this.jogadores;
    }
        // Método que remove um aluno do jogo
        removerAluno(name) {
            const aluno = this.alunos.findIndex((a) => a.name === name);
            if  (aluno === -1) {
                return null;
            }
            return this.alunos.splice(aluno, 1)[0];
        }
    }   


export default Jogo;