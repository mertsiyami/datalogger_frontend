import React from "react";
import "./DeviceDropDown.scss";

const DeviceDropDown = ({ devices, setSelectedDevice }) => {


  const handleSelect = (event) => {
    const selectedId = event.target.value;
    const selectedDevice = devices.find((device) => device._id === selectedId);
    setSelectedDevice(selectedDevice);
  };

  return (
    <select style={{ margin: "0 auto" }} onChange={handleSelect} defaultValue="">
      <option value="" disabled>
        Select a device
      </option>
      {devices.length > 0 ? (
        devices.map((device) => (
          <option key={device._id} value={device._id}>
            {device.name || device.serialNumber || "Unnamed Device"}
          </option>
        ))
      ) : (
        <option disabled>No devices available</option>
      )}
    </select>
  );
};

export default DeviceDropDown;
