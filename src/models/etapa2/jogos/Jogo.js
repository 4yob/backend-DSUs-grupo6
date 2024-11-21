// Objetivo: Definir a classe Jogos.
class Jogo {
    constructor(alunos, jogadores, grupos, chat) {
        this.alunos = [];
        this.jogadores = [];
        this.grupos = [];
        this.chat = null;
    }

    generateId() {
        return Math.floor(Math.random() * 999) + 1;
    }

    mostrarAlunos() {
        return this.alunos.filter((alunos) => alunos.grupos === grupos && (nome || alunos.nome));
    }
 
}


export default Jogo;