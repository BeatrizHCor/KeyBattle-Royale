# KeyBattle-Royale
---

## Objetivo

O KeyBattle-Royale é um jogo desenvolvido pelos alunos Beatriz Helena Pinto Coradi, João Alberto François e Maria Clara Cunha Serfaty como atividade da disciplina de Desenvolvimento Web 1 na Universidade Federal do Paraná, no primeiro semestre de 2023. 

O objetivo desta atividade é criar um jogo de digitação que desafie os jogadores a aprimorarem suas habilidades de digitação de forma lúdica.


## Requisitos 

Necessário a instalação prévia dos programas _MySQL_ e _Apache_.


## Como rodar

Execute o arquivo `tables.sql` no _MySQL_ para criar o banco dados que será utilizado no jogo.

Em seguida, copie os arquivos do jogo para a pasta raiz do seu servidor _Apache_, e colha o endereço dessa pasta.

Para acessar o jogo localmente, abra seu navegador e inclua na barra de URL: `http://localhost/` seguido do endereço _Apache_ colhido anteriormente.


## Funcionalidades

**Jogadores:**
- Cadastrar jogador: colher nome de usuário, e-mail, senha e confirmação de senha.

- Login de jogador: colher nome de usuário e senha.

**Ligas:**
- Cadastrar liga: colher nome da liga, senha e confirmação de senha.

- Entrar em liga: colher nome da liga e senha.

**Histórico**
-Colher e exibir pontuação e histórico do jogador, em ligas e no geral.

**Modos de jogo**
- Casual e ranqueado.


## Validações e medidas de segurança

- Todas as informações fornecidas pelos jogadores passam por verificações para garantir a integridade dos dados.
- As senhas inseridas pelos usuários são criptografadas antes de serem armazenadas no banco de dados.
- É verificado se todos os campos obrigatórios são preenchidos corretamente.
- Medidas de segurança são implementadas para evitar a criação de registros duplicados, como a verificação de cadastro e validação de nomes de ligas.
- A conexão com o banco de dados é fechada assim que o uso dela torna-se dispensável.


## Tutorial

Todos os elementos do jogo devem ser acessados através da entrada do teclado.
Durante a partida, você deve escrever corretamente e o mais rápido possível as palavras que aparecerão na tela dentro do limite de tempo.

Para salvar seu score e fazer com que ele seja exibido em um ranking, é necessario criar ou pertencer a uma liga, além de jogar o modo Ranqueado.

Caso não esteja em uma liga, apenas o modo casual estará disponível.
