import React, { useState, useEffect } from "react";
import TemperatureChart from "../Chart/TemperatureChart";
import HumidityChart from "../Chart/HumidityChart";
import LogList from "../LogList/LogList";
import "./RightPanel.scss";
import { logService } from "../../../../api";

const RightPanel = ({ devices, selectedDevice, setSelectedDevice }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [view, setView] = useState("chart");  // Görüntülenecek bileşen (chart veya list)
  const [filter, setFilter] = useState("all");  // Filtreleme türü: last24h, lastWeek, lastMonth, allTime

  // Cihaz değiştiğinde logları yeniden çek
  useEffect(() => {
    if (selectedDevice) {
      const fetchLogs = async () => {
        try {
          const response = await logService.logsByDeviceId({ deviceId: selectedDevice._id });
          const sortedLogs = sortLogsByDate(response);
          setLogs(sortedLogs); // Tüm logları sakla
          setFilteredLogs(applyFilter(sortedLogs, filter)); // Filtrelenmiş logları güncelle
        } catch (error) {
          console.error("Loglar alınırken hata oluştu:", error);
        }
      };

      fetchLogs();
    }
  }, [selectedDevice]);

  // Filter değiştiğinde filtrelenmiş logları güncelle
  useEffect(() => {
    setFilteredLogs(applyFilter(logs, filter));
  }, [filter, logs]);

  const sortLogsByDate = (logs) => {
    return [...logs].sort((a, b) => new Date(a.date) - new Date(b.date)); // Küçükten büyüğe sıralama
  };

  const applyFilter = (logs, currentFilter) => {
    if (!logs || logs.length === 0) return [];
    
    const currentDate = new Date();
    let result;

    switch (currentFilter) {
      case "last24h":
        result = logs.filter(log => new Date(log.date) > new Date(currentDate - 24 * 60 * 60 * 1000));
        break;
      case "lastWeek":
        result = logs.filter(log => new Date(log.date) > new Date(currentDate - 7 * 24 * 60 * 60 * 1000));
        break;
      case "lastMonth":
        result = logs.filter(log => new Date(log.date) > new Date(currentDate - 30 * 24 * 60 * 60 * 1000));
        break;
      case "all":
      default:
        result = [...logs];
        break;
    }

    return result;
  };

  const toggleView = () => {
    setView(view === "chart" ? "list" : "chart");
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Dropdown seçeneğine göre filtreyi ayarlıyoruz
  };
  
  const handleDeviceChange = (e) => {
    const deviceId = e.target.value;
    if (deviceId === "") {
      setSelectedDevice(null);
      return;
    }
    
    const device = devices.find(d => d._id === deviceId);
    setSelectedDevice(device);
  };

  return (
    <div className="right-panel">
      <div className="components-container">
        <div className="controls-row">
          <div className="device-selector">
            <select 
              onChange={handleDeviceChange}
              value={selectedDevice ? selectedDevice._id : ""}
              className="device-select"
            >
              <option value="">Cihaz seçin</option>
              {devices.map((device) => (
                <option key={device._id} value={device._id}>
                  {device.name || device.serialNumber || "İsimsiz Cihaz"}
                </option>
              ))}
            </select>
          </div>
          
          {selectedDevice && (
            <div className="filter-dropdown">
              <select onChange={handleFilterChange} value={filter}>
                <option value="last24h">Son 24 Saat</option>
                <option value="lastWeek">Son Hafta</option>
                <option value="lastMonth">Son Ay</option>
                <option value="all">Tüm Zamanlar</option>
              </select>
            </div>
          )}
        </div>
        
        {selectedDevice && (
          <div className="view-toggle-buttons">
            <button
              className={`toggle-button ${view === "chart" ? "active" : ""}`}
              onClick={toggleView}
            >
              Grafik
            </button>
            <button
              className={`toggle-button ${view === "list" ? "active" : ""}`}
              onClick={toggleView}
            >
              Liste
            </button>
          </div>
        )}

        {!selectedDevice && (
          <div className="no-device-message">
            <p>Lütfen izlemek istediğiniz cihazı seçin</p>
          </div>
        )}

        {selectedDevice && filteredLogs.length > 0 ? (
          <>
            {view === "chart" ? (
              <div className="charts-container">
                <TemperatureChart logs={filteredLogs} selectedDevice={selectedDevice} />
                <HumidityChart logs={filteredLogs} selectedDevice={selectedDevice} />
              </div>
            ) : (
              <LogList logs={filteredLogs} />
            )}
          </>
        ) : (
          selectedDevice && (
            <p className="no-data-message">Henüz log verisi bulunmamaktadır.</p>
          )
        )}
      </div>
    </div>
  );
};

export default RightPanel;