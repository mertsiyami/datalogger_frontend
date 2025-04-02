import DeviceDropDown from "../DeviceDropDown/DeviceDropDown";
import DevicePreferences from "../DevicePreferences/DevicePreferences";
import DeviceRegister from "../DeviceRegister/DeviceRegister";
import "./Sidebar.scss";

const Sidebar = ({devices, setDevices, selectedDevice, setSelectedDevice}) => {
  
  return (
    <div className="sidebar">
      <DeviceDropDown devices = {devices}  selectedDevice = {selectedDevice} setSelectedDevice = {setSelectedDevice}/>
      {selectedDevice && <DevicePreferences devices = {devices} setDevices = {setDevices} initialDevice={selectedDevice} setInitialDevice = {setSelectedDevice} />}
      <DeviceRegister devices = {devices} setDevices = {setDevices} />
    </div>
  );
};

export default Sidebar;
