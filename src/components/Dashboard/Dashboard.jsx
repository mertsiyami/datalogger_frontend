import RightPanel from "./components/RightPanel/RightPanel";
import { deviceService } from "../../api";
import "./Dashboard.scss";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [devices, setDevices] = useState([]); 
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await deviceService.getDevices(); // API çağrısı
        setDevices(response); // State'i güncelle
      } catch (error) {
        console.error("Cihazlar alınırken hata oluştu:", error);
      }
    };

    fetchDevices();
  }, []); // Sayfa ilk açıldığında çalışır

  return (
    <div className="dashboard">
      <RightPanel 
        devices={devices}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
    </div>
  );
};

export default Dashboard;