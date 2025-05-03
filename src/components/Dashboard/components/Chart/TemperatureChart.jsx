import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./Chart.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureChart = ({ logs, selectedDevice }) => {
  // Tarih ve saat formatını düzenleyen yardımcı fonksiyon
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })} ${date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  // Sıcaklık veri seti
  const data = {
    labels: logs.map((log) => formatDateTime(log.date)),
    datasets: [
      {
        label: "Temperature (°C)",
        data: logs.map((log) => log.temperature),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      // Maksimum sıcaklık sınırı
      {
        label: "Max Temperature",
        data: Array(logs.length).fill(selectedDevice?.maxTemperature),
        borderColor: "rgba(255, 0, 0, 0.7)",
        borderWidth: 2,
        borderDash: [5, 5], // Kesikli çizgi
        fill: false,
        pointRadius: 0, // Nokta gösterme
      },
      // Minimum sıcaklık sınırı
      {
        label: "Min Temperature",
        data: Array(logs.length).fill(selectedDevice?.minTemperature),
        borderColor: "rgba(0, 0, 255, 0.7)",
        borderWidth: 2,
        borderDash: [5, 5], // Kesikli çizgi
        fill: false,
        pointRadius: 0, // Nokta gösterme
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Temperature Over Time" },
      tooltip: {
        callbacks: {
          // Tooltip içeriği için özel callback
          label: function(context) {
            const label = context.dataset.label || '';
            if (label === "Max Temperature") {
              return `Max Limit: ${selectedDevice?.maxTemperature}°C`;
            } else if (label === "Min Temperature") {
              return `Min Limit: ${selectedDevice?.minTemperature}°C`;
            } else {
              return `${label}: ${context.parsed.y}°C`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date & Time'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <h3>Temperature Chart</h3>
      <div className="limit-indicators">
        <div className="limit-indicator max">
          <span className="limit-line"></span>
          <span className="limit-text">Max: {selectedDevice?.maxTemperature}°C</span>
        </div>
        <div className="limit-indicator min">
          <span className="limit-line"></span>
          <span className="limit-text">Min: {selectedDevice?.minTemperature}°C</span>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureChart;