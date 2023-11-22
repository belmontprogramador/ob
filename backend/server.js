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

app.get('/verificarPerdedor', async (req, res) => {
    try {
      // Lógica para verificar o vencedor com o menor número de apostas
      const query = 'SELECT cor, COUNT(*) as total FROM apostas GROUP BY cor ORDER BY total ASC LIMIT 1';
      const resultado = await pool.query(query);
      
      if (resultado.rows.length > 0) {
        const vencedor = resultado.rows[0].cor;
        res.json({ perdedor: vencedor });
      } else {
        res.json({ perdedor: 'Nenhum vencedor encontrado' });
      }
    } catch (error) {
      console.error('Erro ao verificar o vencedor:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  });
  
  

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
