import React, { useState } from "react";
import "./DeviceRegister.scss";
import { deviceService } from "../../../../api";

const DeviceRegister = ({ devices, setDevices}) => {
  const [secretKey, setSecretKey] = useState("");
  const [status, setStatus] = useState("");

  const fetchDevices = async () => {
    try {
      const response = await deviceService.getDevices(); // API çağrısı
      setDevices(response); // State'i güncelle
    } catch (error) {
      console.error("Cihazlar alınırken hata oluştu:", error);
    }
  };


  const handleRegister = async () => {
    setStatus("Loading...");
    try {
      const data = {secretKey}; 
      const response = await deviceService.registerDeviceToUser(data);
      setStatus((response.message === "Device added successfully")? "Successful" : "Failed");
      
      fetchDevices();

    } catch (error) {

      if(typeof(error.response.data.message) !== undefined)
      {
          setStatus(error.response.data.message);
      }

    }
  };

  return (
    <div className="device-register">
      <label for="deviceSecretKey"> Device Secret Key</label>
      <input
        type="text"
        name = "deviceSecretKey"
        id = "deviceSecretKey"
        placeholder="Secret Key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        className="device-register-input"
      />
      {secretKey.length === 128 && (
        <button onClick={handleRegister} className="device-register-button">
          Register
        </button>
      )}
      {status && (
        <p className={`device-register-status ${status === "Successful" ? "Success" : "Erros"}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default DeviceRegister;
