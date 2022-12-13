import './chart.css'; 

import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Label, 
  Tooltip
} from "recharts";

function formatXAxis(value) {
    if(value === 0.5) return "A"
    if(value === 1.5) return "B"
    if(value === 2.5) return "C"
    return value
}

const fontSize = 20; 

export default function ScatterPlot(props) {
    return (
      <ScatterChart
        width={500}
        height={350}
        margin={{
          top: 20,
          left: 50,
          bottom: 20, 
          right: 20
        }}
      >
        <Tooltip/>
        <XAxis type="number" dataKey="x" ticks={[0.5, 1.5, 2.5]} tickFormatter={formatXAxis} domain={[0,3]}>
            <Label value="Models" dy={20} style={{fontSize: fontSize}}/>
        </XAxis>
        <YAxis type="number" dataKey="cross_val_score">
            <Label angle={-90} value="Cross Validation Scores" dx={-40} style={{fontSize: fontSize}}/>
        </YAxis>
        <Scatter data={props.data} fill="#8884d8" />
      </ScatterChart>
    );
  }
  