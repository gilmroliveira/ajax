// URL base para o JSON Server
const url = 'http://localhost:3000/usuarios'; [cite: 84]

/**
 * Função para mostrar mensagens de sucesso ou erro na tela.
 * @param {string} texto - A mensagem a ser exibida.
 * @param {boolean} sucesso - true para sucesso (cor verde), false para erro (cor vermelha).
 */
function mostrarMensagem(texto, sucesso) { [cite: 85, 86]
    const div = document.getElementById('mensagem'); [cite: 87]
    div.textContent = texto; [cite: 88]
    // Define a classe CSS baseada no status de sucesso
    div.className = sucesso ? 'mensagem sucesso' : 'mensagem erro'; [cite: 89]
}

/**
 * Carrega a lista de usuários da API (JSON Server) e popula a tabela.
 */
function carregarLista() { [cite: 91, 92]
    // Requisição GET para buscar os usuários
    fetch(url) [cite: 93]
        .then(res => res.json()) [cite: 94]
        .then(lista => { [cite: 95]
            const corpo = document.getElementById('tabelaCorpo'); [cite: 96]
            corpo.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados [cite: 97]

            // Itera sobre a lista de usuários e cria as linhas da tabela
            lista.forEach(usuario => { [cite: 98]
                const linha = document.createElement('tr'); [cite: 99]
                linha.innerHTML = `
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>
                        <button onclick="editar(${usuario.id})">Editar</button>
                        <button onclick="apagar(${usuario.id})">Apagar</button>
                    </td>
                `; [cite: 100, 101, 102, 103, 104, 105, 106, 107]
                corpo.appendChild(linha); [cite: 108]
            });
        })
        .catch(() => mostrarMensagem('Erro ao carregar a lista.', false));
}

// Evento de submit do formulário: usado para CADASTRO e EDIÇÃO
document.getElementById('formCadastro').addEventListener('submit', function (e) { [cite: 113]
    e.preventDefault(); // Impede o recarregamento da página [cite: 114]

    // Pega os valores atuais do formulário
    const nome = document.getElementById('nome').value; [cite: 147]
    const email = document.getElementById('email').value; [cite: 148]

    // Lógica para CADASTRO (o formulário será restaurado para PUT na função editar)
    // O evento de submit original é para POST
    
    // Requisição POST para cadastrar novo usuário
    fetch(url, { [cite: 149]
        method: 'POST', [cite: 150]
        headers: { 'Content-Type': 'application/json' }, [cite: 151]
        body: JSON.stringify({ nome, email }) // Envia os dados como JSON
    })
    .then(res => res.json())
    .then(() => { [cite: 155]
        mostrarMensagem('Cadastro feito com sucesso!', true); [cite: 156]
        document.getElementById('formCadastro').reset(); // Limpa o formulário [cite: 157]
        carregarLista(); // Recarrega a tabela para mostrar o novo registro [cite: 158]
    })
    .catch(() => mostrarMensagem('Erro ao cadastrar.', false)); [cite: 160]
});

/**
 * Preenche os campos do formulário para edição.
 * @param {number} id - O ID do usuário a ser editado.
 */
function editar(id) { [cite: 162, 163]
    // Requisição GET para buscar os dados do usuário específico
    fetch(`${url}/${id}`) [cite: 164]
        .then(res => res.json()) [cite: 165]
        .then(usuario => { [cite: 166]
            // Preenche o formulário com os dados existentes
            document.getElementById('nome').value = usuario.nome; [cite: 167]
            document.getElementById('email').value = usuario.email; [cite: 168]

            // *** MUDANÇA TEMPORÁRIA DE COMPORTAMENTO DO FORMULÁRIO ***
            // Altera o evento 'onsubmit' para realizar a operação de PUT (Atualização)
            const form = document.getElementById('formCadastro');
            form.onsubmit = function (e) { [cite: 170]
                e.preventDefault(); [cite: 171]

                // Requisição PUT para atualizar o registro
                fetch(`${url}/${id}`, { [cite: 172]
                    method: 'PUT', [cite: 173]
                    headers: { 'Content-Type': 'application/json' }, [cite: 174]
                    body: JSON.stringify({
                        nome: document.getElementById('nome').value, [cite: 207]
                        email: document.getElementById('email').value [cite: 208]
                    }) [cite: 209]
                })
                .then(res => res.json())
                .then(() => { [cite: 212]
                    mostrarMensagem('Atualizado com sucesso!', true); [cite: 213]
                    form.reset(); [cite: 214]
                    carregarLista(); [cite: 215]
                    // *** RESTAURAÇÃO DO COMPORTAMENTO PADRÃO ***
                    // Restaura o submit original (para Cadastro/POST) [cite: 216]
                    form.onsubmit = null; [cite: 217]
                    // O Listener original (POST) assume novamente o controle.
                })
                .catch(() => mostrarMensagem('Erro ao atualizar.', false));
            }; [cite: 219]
        })
        .catch(() => mostrarMensagem('Erro ao buscar dados para edição.', false));
}


/**
 * Exclui um usuário da API com confirmação.
 * @param {number} id - O ID do usuário a ser apagado.
 */
function apagar(id) { [cite: 222, 223]
    // Pede confirmação ao usuário
    if (confirm('Tem certeza que deseja apagar?')) { [cite: 224]
        // Requisição DELETE
        fetch(`${url}/${id}`, { method: 'DELETE' }) [cite: 225]
            .then(() => { [cite: 226]
                mostrarMensagem('Apagado com sucesso!', true); [cite: 227]
                carregarLista(); // Recarrega a tabela [cite: 228]
            })
            .catch(() => mostrarMensagem('Erro ao apagar.', false));
    }
}

// Carrega a lista de usuários assim que a página é carregada [cite: 231]
window.onload = carregarLista;
