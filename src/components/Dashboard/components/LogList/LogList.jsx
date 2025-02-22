import React from "react";
import "./LogList.scss";

const LogList = ({ logs }) => {
  return (
    <div>
      <h3 className="loglist-title">Device Logs</h3>
      <div className="log-list">
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
    </div>
  );
};

export default LogList;
