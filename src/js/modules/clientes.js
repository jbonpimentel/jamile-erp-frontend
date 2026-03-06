/**
 * J'amile Essence Care - Módulo de Clientes
 * Integração com Backend TypeScript
 */

async function carregarClientes() {
    const listaCorpo = document.getElementById('listaClientes');

    try {
        // Chamada para a rota que acabamos de subir no Backend
        const response = await fetch('http://localhost:3000/api/clientes');

        if (!response.ok) throw new Error('Erro ao buscar dados');

        const clientes = await response.json();

        // Limpa a tabela antes de popular
        listaCorpo.innerHTML = '';

        if (clientes.length === 0) {
            listaCorpo.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhum cliente cadastrado.</td></tr>';
            return;
        }

        // Popula a tabela com os dados do MySQL
        clientes.forEach(cliente => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.email || '---'}</td>
                <td>${cliente.telefone || '---'}</td>
                <td>${cliente.cpf || '---'}</td>
            `;
            listaCorpo.appendChild(tr);
        });

    } catch (error) {
        console.error('Erro na requisição:', error);
        listaCorpo.innerHTML = '<tr><td colspan="4" style="text-align:center; color: red;">Erro ao carregar clientes. Verifique o servidor.</td></tr>';
    }
}

// Inicializa a carga ao abrir a página
carregarClientes();

// Função para abrir modal (esqueleto para a próxima funcionalidade)
function abrirModal() {
    console.log("Abrindo modal de cadastro...");
    // Aqui entrará a lógica do formulário de inserção
}

function abrirModal() {
    document.getElementById('modalCliente').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalCliente').style.display = 'none';
    document.getElementById('formCadastroCliente').reset();
}

document.getElementById('formCadastroCliente').addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoCliente = {
        nome: document.getElementById('cadNome').value,
        email: document.getElementById('cadEmail').value,
        telefone: document.getElementById('cadTelefone').value,
        cpf: document.getElementById('cadCpf').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoCliente)
        });

        if (response.ok) {
            alert('Cliente cadastrado com sucesso!');
            fecharModal();
            carregarClientes(); // Recarrega a tabela automaticamente
        } else {
            alert('Erro ao cadastrar.');
        }
    } catch (err) {
        console.error(err);
    }
});