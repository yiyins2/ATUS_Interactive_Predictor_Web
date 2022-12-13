import "./chart.css";

import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';

export default function RadarPlot(props) {
    return (
        <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={props.data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Model A" dataKey="Model A" stroke="#fe4a49" fill="#fe4a49" fillOpacity={0.3} />
        <Radar name="Model B" dataKey="Model B" stroke="#2ab74a" fill="#2ab74a" fillOpacity={0.3} />
        <Radar name="Model C" dataKey="Model C" stroke="#fed766" fill="#fed766" fillOpacity={0.3} />
        <Legend />
      </RadarChart>
    );
}
  