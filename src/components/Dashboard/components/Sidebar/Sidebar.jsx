import DeviceDropDown from "../DeviceDropDown/DeviceDropDown";
import DevicePreferences from "../DevicePreferences/DevicePreferences";
import "./Sidebar.scss";

const Sidebar = ({devices, setDevices, selectedDevice, setSelectedDevice}) => {
  
  return (
    <div className="sidebar">
      <DeviceDropDown devices = {devices}  selectedDevice = {selectedDevice} setSelectedDevice = {setSelectedDevice}/>
      {selectedDevice && <DevicePreferences devices = {devices} setDevices = {setDevices} initialDevice={selectedDevice} setInitialDevice = {setSelectedDevice} />}
    </div>
  );
};

export default Sidebar;
