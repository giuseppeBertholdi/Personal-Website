const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

const COUNTER_FILE = path.join(__dirname, 'contador.json');
const LOG_FILE = path.join(__dirname, 'acessos.log');

// Função para ler o contador do arquivo
function lerContador() {
    try {
        const data = fs.readFileSync(COUNTER_FILE, 'utf8');
        return JSON.parse(data).total || 0;
    } catch (error) {
        console.error('Erro ao ler o contador:', error);
        return 0; // Retorna 0 se o arquivo não existir ou houver erro
    }
}

// Função para atualizar o contador no arquivo
function atualizarContador(novoValor) {
    try {
        fs.writeFileSync(COUNTER_FILE, JSON.stringify({ total: novoValor }));
    } catch (error) {
        console.error('Erro ao atualizar o contador:', error);
    }
}

// Função para registrar informações de acesso
function registrarAcesso(ip) {
    const dataAtual = new Date().toISOString(); // Data e hora atual no formato ISO
    const log = `Acesso em ${dataAtual} | IP: ${ip}\n`;
    try {
        fs.appendFileSync(LOG_FILE, log); // Adiciona o log no final do arquivo
    } catch (error) {
        console.error('Erro ao registrar o acesso:', error);
    }
}

// Rota principal (incrementa o contador e registra o acesso)
app.get('/', (req, res) => {
    const ip = req.ip; // Obtém o IP do visitante
    const totalAcessos = lerContador() + 1; // Incrementa o contador
    atualizarContador(totalAcessos); // Atualiza o arquivo
    registrarAcesso(ip); // Registra o acesso

    // Renderiza a página inicial (sem mostrar os acessos publicamente)
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota protegida para visualizar o número de acessos
app.get('/admin/acessos', (req, res) => {
    const authKey = req.query.key; // Chave secreta enviada na URL (?key=sua-chave-secreta)

    if (authKey !== process.env.ADMIN_KEY) {
        return res.status(403).send('Acesso negado. Chave inválida.');
    }

    const totalAcessos = lerContador(); // Lê o total do arquivo
    res.send(`<h1>O site já foi acessado ${totalAcessos} vezes.</h1>`);
});

// Rota protegida para visualizar o log de acessos
app.get('/admin/logs', (req, res) => {
    const authKey = req.query.key; // Chave secreta enviada na URL (?key=sua-chave-secreta)

    if (authKey !== process.env.ADMIN_KEY) {
        return res.status(403).send('Acesso negado. Chave inválida.');
    }

    try {
        const logs = fs.readFileSync(LOG_FILE, 'utf8'); // Lê o arquivo de logs
        res.send(`<pre>${logs}</pre>`); // Exibe o conteúdo no navegador
    } catch (error) {
        console.error('Erro ao ler os logs:', error);
        res.status(500).send('Erro ao acessar os logs.');
    }
});

// Configuração de arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Outras rotas para páginas estáticas

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

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
