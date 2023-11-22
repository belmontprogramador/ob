import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SlotMachine = () => {
  const [cor, setCor] = useState('');
  const [temporizador, setTemporizador] = useState(60);
  const [vencedor, setVencedor] = useState('');
  const [apostaRealizada, setApostaRealizada] = useState(false);

  useEffect(() => {
  const interval = setInterval(() => {
    setTemporizador((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        handleVerificarPerdedor();
        setApostaRealizada(false);  
        return 60;
      }
    });
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, []);

  const handleAposta = async (cor) => {
    try {
      if (!apostaRealizada) {
        await axios.post(`http://localhost:3001/apostar/${cor}`);
        setCor(cor);
        setApostaRealizada(true);
      } else {
        alert('Você já fez uma aposta nesta rodada.');
      }
    } catch (erro) {
      alert(erro.response.data.mensagem);
    }
  };

  const handleVerificarPerdedor = async () => {
    try {
      const response = await axios.get('http://localhost:3001/verificarPerdedor');
      
      if (response.data.perdedor !== 'Nenhum vencedor encontrado') {
        setVencedor(`O vencedor é: ${response.data.perdedor}`);
      } else {
        setVencedor('Nenhum vencedor nesta rodada.');
      }
    } catch (error) {
      console.error('Erro ao verificar o perdedor:', error);
    }
  };

  return (
    <div>
      <h1>Slot de Opção Binária</h1>
      <p>Tempo restante para resultado: {temporizador} segundos</p>
      <button
        onClick={() => handleAposta('verde')}
        disabled={temporizador === 0 || apostaRealizada}
        style={{ backgroundColor: cor === 'verde' ? 'green' : 'inherit' }}
      >
        Apostar no Verde
      </button>
      <button
        onClick={() => handleAposta('vermelho')}
        disabled={temporizador === 0 || apostaRealizada}
        style={{ backgroundColor: cor === 'vermelho' ? 'red' : 'inherit' }}
      >
        Apostar no Vermelho
      </button>
      <p>Cor escolhida: {cor}</p>
      <p>{vencedor}</p>
    </div>
  );
};

export default SlotMachine;
