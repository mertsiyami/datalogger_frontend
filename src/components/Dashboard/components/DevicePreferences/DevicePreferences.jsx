import React, { useState, useEffect } from "react";
import "./DevicePreferences.scss";
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
      deviceSerialNumber: device.serialNumber,
      name: device.name,
      maxHumidity: device.maxHumidity,
      minHumidity: device.minHumidity,
      maxTemperature: device.maxTemperature,
      minTemperature: device.minTemperature
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
      <label for="name"> Device Name</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Device Name"
        value={device.name}
        onChange={(e) =>
          setDevice({ ...device, name: e.target.value})
        }
      />
      <label for="minTemp"> Minimum Temperature</label>
      <input
        type="text"
        id="minTemp"
        name="minTemp"
        placeholder="Min Temperature"
        value={device.minTemperature}
        onChange={(e) =>
          setDevice({ ...device, minTemperature: e.target.value})
        }
      />
      <label for="maxTemp"> Maximum Temperature</label>
      <input
        type="text"
        id="maxTemp"
        name="maxTemp"
        placeholder="Max Temperature"
        value={device.maxTemperature}
        onChange={(e) =>
          setDevice({ ...device, maxTemperature: e.target.value})
        }
      />
      <label for="minHumidity"> Minimum Humidity</label>
      <input
        type="text"
        name="minHumidity"
        id="minHumidity"
        placeholder="Min Humidity"
        value={device.minHumidity}
        onChange={(e) =>
          setDevice({ ...device, minHumidity: e.target.value})
        }
      />
      <label for="maxHumidity"> Maximum Humidity</label>
      <input
        type="text"
        name="maxHumidity"
        id="maxHumidity"
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