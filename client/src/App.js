import './App.css';

import React, { useState, useEffect } from 'react';

import BarPlot from './BarChart';
import ScatterPlot from './ScatterChart';
import RadarPlot from './RadarChart';
import InputCard from './InputCard';
import GroupBartPlot from './GroupBarChart';

import axios from 'axios';

function App () {
  // const rootElement = document.getElementById("root");

  const [barData, setBarData] = useState([]);

  const [scatterData, setScatterData] = useState([]);

  const [radarData, setRadarData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/predictions');
        setRadarData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.onbeforeunload = async function() {
        const response = await axios.put('http://127.0.0.1:5000/reinit'); 
    };
    return () => {
        window.onbeforeunload = null;
    };
}, []);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
      <InputCard model={"A"} color={"#fe4a49"} update_radar={setRadarData} update_bar={setBarData} update_scatter={setScatterData}/>
      <InputCard model={"B"} color={"#52b000"} update_radar={setRadarData} update_bar={setBarData} update_scatter={setScatterData}/>
      <InputCard model={"C"} color={"#03a1fc"} update_radar={setRadarData} update_bar={setBarData} update_scatter={setScatterData}/>
      </div>
      {/* <RadarPlot data={radarData}/> */}
      <GroupBartPlot data={radarData}/>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <BarPlot data={barData}/>
        <ScatterPlot data={scatterData}/>
      </div>
    </div>
  )
}

export default App;
