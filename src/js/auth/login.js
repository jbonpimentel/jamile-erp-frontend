document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
        // Chamada para o seu servidor TypeScript
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Salva os dados básicos do usuário para usar no dashboard
            localStorage.setItem('user', JSON.stringify(data.user));

            alert(`Bem-vindo(a), ${data.user.nome}!`);

            // Redireciona para o dashboard após o login bem-sucedido
            window.location.href = './dashboard.html';
        } else {
            alert(data.error || 'Falha na autenticação');
        }
    } catch (error) {
        console.error('Erro ao conectar:', error);
        alert('Não foi possível conectar ao servidor. O backend está rodando?');
    }
});