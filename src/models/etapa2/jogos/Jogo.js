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

    removerAluno(grupo, aluno) {
        // Método que remove um aluno do jogo
        const alunoProcurado = this.alunos.filter((aluno) => aluno.grupo !== grupo || aluno.nome !== nome);

        if (!alunoProcurado) {
        return "Aluno não encontrado";
        }
        
        this.alunos = alunoProcurado.delete(aluno);
        return "Aluno removido com sucesso";
    
        return this.alunos;
    }   
}


export default Jogo;