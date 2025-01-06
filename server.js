const express = require('express');
const path = require('path');
const app = express();

// Configurando o diretório de arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'principal.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

app.get('/para_voce', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'para_voce.html'));
});

app.get('/para_empresa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'para_empresa.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});

// Iniciando o servidor
const PORT = 3000; // Você pode alterar o número da porta se necessário
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
