import "./chart.css";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Label, Tooltip } from "recharts";

const fontSize = 20; 

export default function BarPlot(props) {
    return (
        <BarChart data={props.data} 
            isAnimationActive={false} 
            width={500} height={350} 
            margin={{ left: 50, bottom: 20, top:20 , right: 20}}>
        <Tooltip />
        <Bar dataKey="score" fill="fill"/>
        <XAxis dataKey="model">
            <Label value="Models" textAnchor='middle' dy={20} style={{fontSize: fontSize}}/>
        </XAxis>
        <YAxis dataKey="score">
            <Label value="Scores on Test Set" angle={-90} dx={-40} style={{fontSize: fontSize}}/>
        </YAxis>
        </BarChart>
  );
}