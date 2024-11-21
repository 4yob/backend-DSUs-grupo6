class Aluno {
    constructor(name, idade, turma) {
        this.id = this.generateId();
        this.name = name;
        this.idade = idade;
        this.turma = turma;
    }
    generateId() {
        return Math.floor(Math.random() * 999) + 1;
    }
}
export default Aluno;