const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./dbConfig'); // Certifique-se de ajustar o caminho conforme necessário

const app = express();
const PORT = 3001; // Pode ser qualquer porta disponível

app.use(cors());
app.use(bodyParser.json());

// Restante do seu código...

app.post('/apostar/:cor', async (req, res) => {
  const { cor } = req.params;

  try {
    // Lógica para inserir a aposta no banco de dados
    const query = 'INSERT INTO apostas (cor) VALUES ($1) RETURNING *';
    const values = [cor];
    const resultado = await pool.query(query, values);
    const novaAposta = resultado.rows[0];

    res.json(novaAposta);
  } catch (error) {
    console.error('Erro ao armazenar aposta:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Rota para verificar o vencedor
app.get('/menorNumeroApostas', async (req, res) => {
    try {
      // Lógica para consultar o menor número de apostas nos últimos 60 segundos
      const query = 'SELECT MIN(numero_apostas) AS menor_numero_apostas FROM apostas WHERE data_insercao >= NOW() - INTERVAL \'60 seconds\'';
      const resultado = await pool.query(query);
  
      res.json(resultado.rows[0]);
    } catch (error) {
      console.error('Erro ao obter o menor número de apostas:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
