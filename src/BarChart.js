import "./chart.css";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Label } from "recharts";

const fontSize = 20; 

export default function BarPlot(props) {
    return (
        <BarChart data={props.data} 
            isAnimationActive={false} 
            width={500} height={500} 
            margin={{ left: 20, bottom: 20, top:20 , right: 5}}>
        <Bar dataKey="score" fill="fill"/>
        <XAxis dataKey="model">
            <Label value="Models" textAnchor='middle' dy={25} style={{fontSize: fontSize}}/>
        </XAxis>
        <YAxis dataKey="score">
            <Label value="Scores on Test Set" angle={-90} dx={-30} style={{fontSize: fontSize}}/>
        </YAxis>
        </BarChart>
  );
}