import React, { useState, useEffect } from "react";
import Chart from "../Chart/Chart";
import LogList from "../LogList/LogList";
import "./RightPanel.scss";
import { logService } from "../../../../api";

const RightPanel = ({ selectedDevice }) => {
  const [logs, setLogs] = useState([]);

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

  return (
    <div className="right-panel">
      <div className="components-container">
        {logs.length > 0 ? (
          <>
            <Chart logs={logs} />
            <LogList logs={logs} />
          </>
        ) : (
          <p className="no-data-message">Henüz log verisi bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
