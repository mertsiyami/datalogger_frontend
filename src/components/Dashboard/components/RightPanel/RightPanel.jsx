import React, { useState, useEffect } from "react";
import Chart from "../Chart/Chart";
import LogList from "../LogList/LogList";
import "./RightPanel.scss";
import { logService } from "../../../../api";

const RightPanel = ({ selectedDevice }) => {
  const [logs, setLogs] = useState([]);
  const [view, setView] = useState("chart");  // Yeni state: Görüntülenecek bileşen (chart veya list)

  useEffect(() => {
    if (selectedDevice) {
      const fetchLogs = async () => {
        try {
          const response = await logService.logsByDeviceId({ deviceId: selectedDevice._id });
          setLogs(response);
        } catch (error) {
          console.error("Cihazlar alınırken hata oluştu:", error);
        }
      };

      fetchLogs();
    }
  }, [selectedDevice]);

  const toggleView = () => {
    setView(view === "chart" ? "list" : "chart");  // Seçilen duruma göre view değiştirilir
  };

  return (
    <div className="right-panel">
      <div className="components-container">
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
