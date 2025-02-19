import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./Chart.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ logs }) => {
  const data = {
    labels: logs.map((log) => new Date(log.date).toLocaleTimeString()),
    datasets: [
      {
        label: "Temperature (°C)",
        data: logs.map((log) => log.temperature),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Humidity (%)",
        data: logs.map((log) => log.humidity),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Temperature & Humidity Over Time" },
    },
  };

  return (
    <div className="chart-container">
      <h3>Temperature & Humidity Chart</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
