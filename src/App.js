import './App.css';

import React, { useState, useEffect } from 'react';

import BarPlot from './BarChart';
import ScatterPlot from './ScatterChart';
import InputCard from './InputCard';

import axios from 'axios';

function App () {
  // const rootElement = document.getElementById("root");

  const [barData, setBarData] = useState([]);

  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/scores');
        setBarData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/cross_val_scores');
        setScatterData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <InputCard model={"A"}/>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <BarPlot data={barData}/>
        <ScatterPlot data={scatterData}/>
      </div>
    </div>
  )
}

export default App;
