import React, { useEffect, useState } from 'react';
import SlotMachine from './components/SlotMachine';
import { getCandles } from '../src/components/DataServer';
import Chart from './components/Chart';

function App() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1m");
  const [data, setData] = useState([]);

  useEffect(() => {
    getCandles(symbol, interval)
      .then(data => setData(data))
      .catch(err => alert(err.response ? err.response.data : err.message));
  }, [symbol, interval]);

  function onSymbolChange(event) {
    setSymbol(event.target.value);
  }

  function onIntervalChange(event) {
    setInterval(event.target.value);
  }

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div style={{ width: '40%' }}>
        <SlotMachine />
      </div>
      <div style={{ width: '60%', padding: '20px' }}>
        {/* Exibir informações das velas aqui */}
        <h2>Dados das Velas:</h2>
        <ul>
          {data.map((candle, index) => (
            <li key={index}>
              Aberto: {candle.y[0]}, Alto: {candle.y[1]}, Baixo: {candle.y[2]}, Fechado: {candle.y[3]}
            </li>
          ))}
        </ul>
        {/* Adicione o componente Chart aqui */}
        <select onChange={onSymbolChange} value={symbol}>
          <option>BTCUSDT</option>
          <option>ETHUSDT</option>
          <option>ADAUSDT</option>
        </select>
        <select onChange={onIntervalChange} value={interval}>
          <option>1m</option>
          <option>15m</option>
          <option>1h</option>
          <option>1d</option>
        </select>
        <Chart data={data} />
      </div>
    </div>
  );
}

export default App;
