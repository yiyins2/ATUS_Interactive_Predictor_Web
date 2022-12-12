import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, 
  Label
} from "recharts";

export default function GroupBartPlot(props) {
    return (
      <BarChart
        width={1000}
        height={500}
        data={props.data}
        margin={{
          top: 5,
          left: 50,
          bottom: 120
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="category" interval={0} angle={-35} dy={50}/>
        <YAxis>
            <Label value="Time Usage (hour)" angle={-90} dx={-40} style={{fontSize: 20}}/>
        </YAxis>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="right"/>
        <Bar dataKey="Model A" fill="#fe4a49" />
        <Bar dataKey="Model B" fill="#52b000" />
        <Bar dataKey="Model C" fill="#03a1fc" />
      </BarChart>
    );
}
  