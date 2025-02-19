import React from "react";
import "./LogList.scss";

const LogList = ({ logs }) => {
  return (
    <div className="log-list">
      <h3 className="loglist-title">Device Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index} className="log-item">
            <div className="log-date">
              {new Date(log.date).toLocaleString()}
            </div>
            <div className="log-details">
              <span>
                <strong>Temperature:</strong> {log.temperature}°C
              </span>
              <span>
                <strong>Humidity:</strong> {log.humidity}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogList;
