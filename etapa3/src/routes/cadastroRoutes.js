import { Router } from "express";

const cadastroRoutes = Router();

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

});

cadastroRoutes.put("/atualizar", (req, res) => {

});

cadastroRoutes.delete("/remover", (req, res) => {

});

export default cadastroRoutes;
