// Objetivo: Definir a classe Jogos.
class Jogo {
    constructor(alunos, jogadores, grupos, chat = null) {
        this.alunos = alunos;
        this.jogadores = jogadores;
        this.grupos = grupos;
        this.chat = chat;
    }

    generateId() {
        return Math.floor(Math.random() * 999) + 1;
    }

    mostrarAlunos() {
        return this.alunos.map((aluno) => {
            return {
                nome: aluno.nome,
                turma: aluno.turma
            }
        });
    }

    mostrarJogadores(jogadores) {
        // Método que retorna o nome e a turma de cada jogador do array de jogadores
        return jogadores.map((jogador) => {
            return {
                nome: jogador.nome,
                turma: jogador.turma
            }
        });

    }

    iniciarJogo() {
        // Converter alunos em jogadores
        this.jogadores = this.alunos.map(aluno => {
            return { nome: aluno.nome, turma: aluno.turma, tipo: 'jogador' };
        });

        // Escolher aleatoriamente um grupo como sabotadores
        const numSabotadores = Math.floor(this.jogadores.length);
        const indicesSabotadores = new Set();
        while (indicesSabotadores.size < numSabotadores) {
            const index = Math.floor(Math.random() * this.jogadores.length);
            indicesSabotadores.add(index);
        }

        Array.from(indicesSabotadores).forEach(index => {
            this.jogadores[index].tipo = 'sabotador';
        });

        console.log("Jogadores:", this.jogadores);
    }

}


export default Jogo;