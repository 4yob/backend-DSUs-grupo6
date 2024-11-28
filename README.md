# DS- US: Jogo utilizando Back-end

##### Participantes
Alejandra Barros
Ana Carolina Freitas
Bruna Savelli
Evelyn Oliveira
Laura Violla

## Etapa 1
Realizamos as primeiras classes para conhecer como seria feito este projeto, com a ajuda dos docentes conseguimos realizar essa atividade.

## Etapa 2
Nesta fase do projeto, focamos na implementação da classe Jogo. Trabalhamos em três aspectos principais:

### UML da Classe "Jogo"
Criamos o diagrama de classe, detalhando atributos e métodos. A UML reflete o planejamento lógico da estrutura e foi validada pela equipe.

#### Atributos:

aluno (Array): Lista de alunos cadastrados.
jogadores (Array): Lista de jogadores após o início do jogo.
grupos (Number): Quantidade de grupos (default: 6).
chat (Chat): Gerencia mensagens trocadas entre os jogadores.

#### Métodos:

mostrarAlunos(grupo = null, nome = null): Lista alunos, agrupados e ordenados por critérios fornecidos.
removerAluno(nome): Exclui um aluno pelo nome.
mostrarJogadores(dados): Exibe informações detalhadas dos jogadores.
iniciarJogo(): Converte os alunos em jogadores e escolhe aleatoriamente um grupo como sabotadores.

![Diagrama UML](media/UML%20DS%20US-%20grupo%206.jpg)