import React from "react";
import Chart from "../Chart/Chart";
import LogList from "../LogList/LogList";
import "./RightPanel.scss";

const RightPanel = ({ selectedDevice }) => {
  // Statik log verisi
  const logs = [
    { temperature: 22.5, humidity: 45, date: "2024-02-19T10:30:00Z" },
    { temperature: 23.1, humidity: 50, date: "2024-02-19T11:00:00Z" },
    { temperature: 21.8, humidity: 48, date: "2024-02-19T11:30:00Z" },
  ];

  return (
    <div className="right-panel">
      <div className="components-container">
      <h2>{selectedDevice?.name || "No Device Selected"}</h2>
      <Chart logs={logs} />
      <LogList logs={logs} />
      </div>
    </div>
  );
};

export default RightPanel;
