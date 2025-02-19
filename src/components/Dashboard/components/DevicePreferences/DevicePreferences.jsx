import React, { useState, useEffect } from "react";
import "./DeviceInfo.scss";
import { deviceService } from "../../../../api";
import axios from "axios";

const DevicePreferences = ({ devices, setDevices, initialDevice, setInitialDevice }) => {
  
  const [device, setDevice] = useState(initialDevice);
  const [responseMessage, setResponseMessage] = useState(null)

  useEffect(() => {
    setDevice(initialDevice)
  }, [initialDevice]);

  const handleSubmit = async () => {

    const requestData = {
      serialNumber: device.serialNumber,
      caption: device.caption,
      maxHumidity: device.maxHumidity,
      minHumidity: device.minHumidity,
      maxTemperature: device.maxTemperature,
      minTemperature: device.minTemperature,
      name : device.name
    };

    try {
      const response = await deviceService.update(requestData);
      setInitialDevice({ ...initialDevice, ...requestData });
      setDevices(
        devices.map((d) =>
          d.serialNumber === device.serialNumber ? { ...d, ...device } : d
        )
      );
      setResponseMessage("The device has updated successfully.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setResponseMessage(
          error.response.data.message ?? "Update failed. Please try again."
        );
      } else {
        setResponseMessage("Update failed. Please try again.");
      }
    }

  };

  return (
    <div className="device-info">
      <input
        type="text"
        name="name"
        placeholder="Device Name"
        value={device.name}
        onChange={(e) =>
          setDevice({ ...device, name: e.target.value})
        }
      />
      <input
        type="text"
        name="minTemp"
        placeholder="Min Temperature"
        value={device.minTemperature}
        onChange={(e) =>
          setDevice({ ...device, minTemp: e.target.value})
        }
      />
      <input
        type="text"
        name="maxTemp"
        placeholder="Max Temperature"
        value={device.maxTemperature}
        onChange={(e) =>
          setDevice({ ...device, maxTemp: e.target.value})
        }
      />
      <input
        type="text"
        name="minHumidity"
        placeholder="Min Humidity"
        value={device.minHumidity}
        onChange={(e) =>
          setDevice({ ...device, minHumidity: e.target.value})
        }
      />
      <input
        type="text"
        name="maxHumidity"
        placeholder="Max Humidity"
        value={device.maxHumidity}
        onChange={(e) =>
          setDevice({ ...device, maxHumidity: e.target.value})
        }
      />
      {responseMessage && <p>{responseMessage}</p>}
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default DevicePreferences;