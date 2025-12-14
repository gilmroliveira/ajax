# ajax
AJAX
# 🚀 Tarefa 7 - Formulário AJAX com Tabela Dinâmica

[cite_start]Este projeto foi desenvolvido para a disciplina de **Desenvolvimento Web II** (Unidade 7 - Tarefa 7).

[cite_start]O objetivo é criar uma aplicação front-end que utiliza **AJAX** (com a API `fetch`) para se comunicar com um servidor simulado (JSON Server), permitindo o cadastro, visualização, edição e exclusão de registros em uma tabela dinâmica[cite: 5].

---

## 🛠️ Tecnologias Utilizadas

* [cite_start]**HTML5:** Estrutura base da página, formulário e tabela[cite: 12].
* [cite_start]**CSS:** Estilização básica (cores para mensagens e formatação da tabela)[cite: 19, 20, 21, 22, 23, 24].
* [cite_start]**JavaScript:** Lógica principal da aplicação, responsável pela comunicação AJAX (`fetch`), manipulação do DOM e lógica de edição/exclusão[cite: 83].
* [cite_start]**JSON Server:** Utilizado para simular uma API RESTful, fornecendo um "banco de dados" (`db.json`) simples e funcional[cite: 11, 255].

---

## ⚙️ Configuração e Execução do Projeto

Para rodar esta aplicação localmente, é necessário ter o Node.js e o JSON Server instalados.

### 1. Pré-requisitos

Instale o JSON Server globalmente:
```bash
npm install -g json-server [cite: 264]
Preencha o formulário e clique em Cadastrar para enviar dados via POST.

Verifique se a tabela é atualizada dinamicamente com os novos dados.

Teste os botões Editar (requisição PUT) e Apagar (requisição DELETE).

