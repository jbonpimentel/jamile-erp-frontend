document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura os dados dos inputs do novo HTML
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Chamada para o seu backend TypeScript (Porta 3000)
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha: password }) // 'senha' deve bater com o que o Controller espera
        });

        const data = await response.json();

        if (response.ok) {
            // Salva o usuário e o token no localStorage para sessões futuras
            localStorage.setItem('user', JSON.stringify(data.user));

            // Alerta de sucesso personalizado
            alert(`Bem-vindo(a), ${data.user.nome}! Acesso autorizado.`);

            // Redireciona para o dashboard
            window.location.href = './dashboard.html';
        } else {
            // Exibe o erro vindo do backend (ex: "Senha incorreta")
            alert(data.error || 'Falha na autenticação. Verifique seus dados.');
        }
    } catch (error) {
        console.error('Erro na conexão:', error);
        alert('Erro ao conectar com o servidor. O backend J\'amile está rodando?');
    }
});