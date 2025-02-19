import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import RightPanel from "./components/RightPanel/RightPanel"

import "./Dashboard.scss";

const Dashboard = () => {
  const staticDevices = [
    { id: 1, name: 'Device 1', serialNumber:1, _id:132, minTemperature:15, maxTemperature:43, minHumidity:12,maxHumidity:15 },
    { id: 2, name: 'Device 2', serialNumber:2, _id:133 },
    { id: 3, name: 'Device 3', serialNumber:3, _id:134 },
  ];

  const [devices, setDevices] = useState(staticDevices);
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <div className="dashboard">
      <Sidebar devices = {devices} setDevices = {setDevices} selectedDevice = {selectedDevice} setSelectedDevice = {setSelectedDevice}/>
      <RightPanel selectedDevice = {selectedDevice}/>
    </div>
  );
};

export default Dashboard;
