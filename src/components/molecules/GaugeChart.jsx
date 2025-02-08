import React from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const GradientGaugeChart = () => {
  // Sample data for the gauge chart
  const data = [
    {
      name: "Percent",
      value: 75,
      fill: "url(#gradient)", // Use gradient as the fill
    },
  ];

  return (
    <div>
      <h2>Gradient Gauge Chart</h2>
      <RadialBarChart
        width={400}
        height={400}
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={30}
        data={data}
      >
        {/* Define a linear gradient for the gauge */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4caf50" />
            <stop offset="50%" stopColor="#8bc34a" />
          </linearGradient>
        </defs>

        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="value"
          cornerRadius={20} // For rounded edges
        />

        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={{
            top: 100,
            right: 20,
            lineHeight: "24px",
          }}
        />
      </RadialBarChart>
    </div>
  );
};

export default GradientGaugeChart;
