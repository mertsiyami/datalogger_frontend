import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./Chart.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HumidityChart = ({ logs, selectedDevice }) => {
  // Tarih ve saat formatını düzenleyen yardımcı fonksiyon
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })} ${date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  // Nem veri seti
  const data = {
    labels: logs.map((log) => formatDateTime(log.date)),
    datasets: [
      {
        label: "Humidity (%)",
        data: logs.map((log) => log.humidity),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      // Maksimum nem sınırı
      {
        label: "Max Humidity",
        data: Array(logs.length).fill(selectedDevice?.maxHumidity),
        borderColor: "rgba(255, 0, 0, 0.7)",
        borderWidth: 2,
        borderDash: [5, 5], // Kesikli çizgi
        fill: false,
        pointRadius: 0, // Nokta gösterme
      },
      // Minimum nem sınırı
      {
        label: "Min Humidity",
        data: Array(logs.length).fill(selectedDevice?.minHumidity),
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
      title: { display: true, text: "Humidity Over Time" },
      tooltip: {
        callbacks: {
          // Tooltip içeriği için özel callback
          label: function(context) {
            const label = context.dataset.label || '';
            if (label === "Max Humidity") {
              return `Max Limit: ${selectedDevice?.maxHumidity}%`;
            } else if (label === "Min Humidity") {
              return `Min Limit: ${selectedDevice?.minHumidity}%`;
            } else {
              return `${label}: ${context.parsed.y}%`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Humidity (%)'
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
      <h3>Humidity Chart</h3>
      <div className="limit-indicators">
        <div className="limit-indicator max">
          <span className="limit-line"></span>
          <span className="limit-text">Max: {selectedDevice?.maxHumidity}%</span>
        </div>
        <div className="limit-indicator min">
          <span className="limit-line"></span>
          <span className="limit-text">Min: {selectedDevice?.minHumidity}%</span>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default HumidityChart;