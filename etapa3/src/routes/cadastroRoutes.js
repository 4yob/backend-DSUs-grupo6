import { Router } from "express";
import Jogo from "../../../etapa2/src/models/Jogo.js";

const cadastroRoutes = Router();

const jogoLista = new Jogo();
let alunos = []


cadastroRoutes.post("/adicionar", (req, res) => {
    const {name, idade, turma} = req.body

    // Validação para campos obrigatórios
    if(!name || !turma){
        return res.status(400).send({
            message: "Os campos nome e turma são obrigatórios"})
    }

    if(!Number.isInteger(idade)){
        return res.status(400).send({
            message: "Por favor digite um número inteiro"})
    }

    const novoAluno = {
        id: Number(Math.floor(Math.random()* 999)+ 1),
        name,
        idade,
        turma
    }

    alunos.push(novoAluno)
    return res.status(201).send({
        message: "Aluno cadastrado com sucesso!", 
        novoAluno
    })
});

cadastroRoutes.get("/listar", (req, res) => {
    return res.status(200).send(alunos);
});

cadastroRoutes.put("/atualizar:id", (req, res) => {
    const{ id } =req.params

    const aluno = alunos.find((student) => student.id === Number(id))

    if(!aluno){
        return res.status(404).send({
            message: "Aluno não encontrado!"
        })
    }

    const {name, idade, turma} = req.body

    aluno.name = name
    aluno.idade = idade
    aluno.turma = turma

    return res.status(200).send({
        message: "Aluno atualizado!",
        aluno,
    })
});

cadastroRoutes.delete("/remover:id", (req, res) => {
    const { id } = req.params

    const aluno = alunos.find((student) => student.id === Number(id))

    if(!aluno) {
        return res.status(404).send({
            message: "Aluno não encontrado!"
        })
    }

    alunos = alunos.filter((student) => student.id !== Number(id))

    return res.status(200).send({
        message: "Aluno removido com sucesso!",
        aluno,
    })
});

export default cadastroRoutes;
