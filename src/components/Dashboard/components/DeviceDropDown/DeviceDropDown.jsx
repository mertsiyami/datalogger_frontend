import React from "react";
import "./DeviceDropDown.scss";

const DeviceDropDown = ({ devices, setSelectedDevice }) => {

  const handleSelect = (event) => {
    console.log('aaa')
    const selectedId = event.target.value;
    const selectedDevice = devices.find((device) => device._id.toString() === selectedId);
    console.log(selectedDevice)
    setSelectedDevice(selectedDevice);
  };


  return (
    <select style={{ margin: '0 auto' }} onChange={handleSelect}>
      <option value="" disabled selected>
        Select a device
      </option>
      {devices.map((device, index) => (
        <option key={index} value={device._id}>
          {device.name || device.serialNumber || ""}
        </option>
      ))}
    </select>
  );
};

export default DeviceDropDown;
