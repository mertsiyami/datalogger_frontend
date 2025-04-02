import React, { useState, useEffect } from "react";
import Chart from "../Chart/Chart";
import LogList from "../LogList/LogList";
import "./RightPanel.scss";
import { logService } from "../../../../api";

const RightPanel = ({ selectedDevice }) => {
  const [logs, setLogs] = useState([]);
  const [view, setView] = useState("chart");  // Görüntülenecek bileşen (chart veya list)
  const [filter, setFilter] = useState("all");  // Filtreleme türü: last24h, lastWeek, lastMonth, allTime

  useEffect(() => {
    if (selectedDevice) {
      const fetchLogs = async () => {
        try {
          const response = await logService.logsByDeviceId({ deviceId: selectedDevice._id });
          const sortedLogs = sortLogsByDate(response);
          setLogs(applyFilter(sortedLogs)); // İlk yüklemede filtre uyguluyoruz
        } catch (error) {
          console.error("Loglar alınırken hata oluştu:", error);
        }
      };

      fetchLogs();
    }
  }, [selectedDevice]);

  useEffect(() => {
    if (logs.length > 0) {
      const sortedLogs = sortLogsByDate(logs);  // Filtre sonrası tarih sıralamasını sağlıyoruz
      setLogs(applyFilter(sortedLogs));
    }
  }, [filter]);

  const sortLogsByDate = (logs) => {
    return logs.sort((a, b) => new Date(a.date) - new Date(b.date)); // Küçükten büyüğe sıralama
  };

  const applyFilter = (logs) => {
    const currentDate = new Date();
    let filteredLogs;

    switch (filter) {
      case "last24h":
        filteredLogs = logs.filter(log => new Date(log.date) > currentDate - 24 * 60 * 60 * 1000);
        break;
      case "lastWeek":
        filteredLogs = logs.filter(log => new Date(log.date) > currentDate - 7 * 24 * 60 * 60 * 1000);
        break;
      case "lastMonth":
        filteredLogs = logs.filter(log => new Date(log.date) > currentDate - 30 * 24 * 60 * 60 * 1000);
        break;
      case "all":
      default:
        filteredLogs = logs;
        break;
    }

    return filteredLogs;
  };

  const toggleView = () => {
    setView(view === "chart" ? "list" : "chart");
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Dropdown seçeneğine göre filtreyi ayarlıyoruz
  };

  return (
    <div className="right-panel">
      <div className="components-container">
        
      <div className="filter-dropdown">
          <select onChange={handleFilterChange} value={filter}>
            <option value="last24h">Last 24h</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <div className="view-toggle-buttons">
          <button
            className={`toggle-button ${view === "chart" ? "active" : ""}`}
            onClick={toggleView}
          >
            Chart
          </button>
          <button
            className={`toggle-button ${view === "list" ? "active" : ""}`}
            onClick={toggleView}
          >
            List
          </button>
        </div>


        {logs.length > 0 ? (
          <>
            {view === "chart" ? <Chart logs={logs} /> : <LogList logs={logs} />}
          </>
        ) : (
          <p className="no-data-message">Henüz log verisi bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
