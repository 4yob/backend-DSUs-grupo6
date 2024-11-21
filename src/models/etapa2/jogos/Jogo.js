// Objetivo: Definir a classe Jogos.
class Jogos {
    constructor(aluno, jogadores, grupos, chat) {
        this.aluno = aluno;
        this.jogadores = jogadores;
        this.grupos = grupos;
        this.chat = chat;
    }

    generateId() {
        return Math.floor(Math.random() * 999) + 1;
    }
 
}


export default Jogos;