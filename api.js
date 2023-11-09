const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Importe o módulo CORS
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_alquimia',
});

app.use(express.json());

// Use o middleware CORS com as opções personalizadas
app.use(cors());

// Rota de autenticação
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Consulta ao banco de dados para verificar as credenciais
    const [rows] = await db.query('SELECT * FROM usuario WHERE login_usuario = ? AND senha_usuario = ?', [email, password]);

    if (rows.length === 1) {
      // Credenciais válidas
      res.status(200).json({ message: 'Autenticado com sucesso' });
    } else {
      // Credenciais inválidas
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para buscar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    // Consulta ao banco de dados para buscar todos os produtos
    const [rows] = await db.query('SELECT * FROM ins_insumo');
    res.status(200).json(rows); // Retorne os dados dos produtos como JSON
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor API rodando na porta ${port}`);
});
