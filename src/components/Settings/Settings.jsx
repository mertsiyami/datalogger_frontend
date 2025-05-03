import React, { useState, useEffect } from "react";
import { deviceService, userService } from "../../api";
import "./Settings.scss";

const Settings = () => {
  // Cihaz kayıt durumu için state'ler
  const [deviceSerialNumber, setDeviceSerialNumber] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  
  // Kullanıcı bilgileri için state'ler
  const [userInfo, setUserInfo] = useState({
    email: "",
    phoneNumber: "",
    username: ""
  });

  // Form değerleri için state
  const [formValues, setFormValues] = useState({
    email: "",
    phoneNumber: "",
    username: ""
  });

  // Kullanıcı güncelleme durumu
  const [updateStatus, setUpdateStatus] = useState("");
  
  // Cihazların listesi
  const [devices, setDevices] = useState([]);
  
  // Seçili cihaz
  const [selectedDevice, setSelectedDevice] = useState(null);
  
  // Cihaz ayarları için state
  const [deviceSettings, setDeviceSettings] = useState({
    name: "",
    minTemperature: "",
    maxTemperature: "",
    minHumidity: "",
    maxHumidity: ""
  });
  
  // Cihaz güncelleme durumu
  const [deviceUpdateStatus, setDeviceUpdateStatus] = useState("");
  
  // Kullanıcı bilgilerini getir
  const fetchUserInfo = async () => {
    try {
      const response = await userService.getUserInfo();
      setUserInfo(response);
      setFormValues({
        email: response.email || "",
        phoneNumber: response.phoneNumber || "",
        username: response.username || ""
      });
    } catch (error) {
      console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
    }
  };
  
  const fetchDevices = async () => {
    try {
      const response = await deviceService.getDevices();
      setDevices(response);
    } catch (error) {
      console.error("Cihazlar alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchDevices();
  }, []);
  
  // Seçili cihaz değiştiğinde cihaz ayarlarını güncelle
  useEffect(() => {
    if (selectedDevice) {
      setDeviceSettings({
        name: selectedDevice.name || "",
        minTemperature: selectedDevice.minTemperature || "",
        maxTemperature: selectedDevice.maxTemperature || "",
        minHumidity: selectedDevice.minHumidity || "",
        maxHumidity: selectedDevice.maxHumidity || ""
      });
    } else {
      setDeviceSettings({
        name: "",
        minTemperature: "",
        maxTemperature: "",
        minHumidity: "",
        maxHumidity: ""
      });
    }
  }, [selectedDevice]);
  
  // Form input değişikliklerini işleme
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  // Cihaz ayarları değişikliklerini işleme
  const handleDeviceSettingsChange = (e) => {
    const { name, value } = e.target;
    setDeviceSettings({
      ...deviceSettings,
      [name]: value
    });
  };

  // Kullanıcı bilgilerini güncelleme
  const handleUpdateUser = async () => {
    setUpdateStatus("Güncelleniyor...");
    try {
      const response = await userService.update(formValues);
      
      if (response && response.success) {
        setUpdateStatus("Bilgileriniz başarıyla güncellendi");
        fetchUserInfo(); // Kullanıcı bilgilerini yeniden çek
      } else {
        setUpdateStatus("Güncelleme başarısız oldu");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setUpdateStatus(error.response.data.message);
      } else {
        setUpdateStatus("Bir hata oluştu, lütfen tekrar deneyin");
      }
    }
  };
  
  // Cihaz ayarlarını güncelleme
  const handleUpdateDevice = async () => {
    if (!selectedDevice) {
      setDeviceUpdateStatus("Lütfen bir cihaz seçin");
      return;
    }
    
    setDeviceUpdateStatus("Güncelleniyor...");
    try {
      const requestData = {
        deviceSerialNumber: selectedDevice.serialNumber,
        name: deviceSettings.name,
        maxHumidity: deviceSettings.maxHumidity,
        minHumidity: deviceSettings.minHumidity,
        maxTemperature: deviceSettings.maxTemperature,
        minTemperature: deviceSettings.minTemperature
      };
      
      const response = await deviceService.update(requestData);


      if (response && response.success) {
        setDeviceUpdateStatus("Cihaz ayarları başarıyla güncellendi");
        
        // Seçili cihazı güncelle
        setSelectedDevice({ ...selectedDevice, ...deviceSettings });
        
        // Cihaz listesini güncelle
        setDevices(
          devices.map((d) =>
            d._id === selectedDevice._id ? { ...d, ...deviceSettings } : d
          )
        );
        
        // Cihaz listesini yeniden çek
        await fetchDevices();
      } else {
        setDeviceUpdateStatus("Güncelleme başarısız oldu");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setDeviceUpdateStatus(error.response.data.message);
      } else {
        setDeviceUpdateStatus("Bir hata oluştu, lütfen tekrar deneyin");
      }
    }
  };
  
  // Cihaz kaydetme işlemi
  const handleRegisterDevice = async () => {
    setRegisterStatus("Yükleniyor...");
    try {
      const data = { deviceSerialNumber };
      const response = await deviceService.addDevice(data);
      
      if (response && (response.success || response.message === "Device added successfully")) {
        setRegisterStatus("Cihaz başarıyla kaydedildi");
        setDeviceSerialNumber(""); // Input'u temizle
        await fetchDevices(); // Cihaz listesini güncelle
      } else {
        setRegisterStatus("Cihaz kaydedilemedi");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setRegisterStatus(error.response.data.message);
      } else {
        setRegisterStatus("Bir hata oluştu, lütfen tekrar deneyin");
      }
    }
  };
  
  // Cihaz seçme işlemi
  const handleDeviceSelect = (e) => {
    const deviceId = e.target.value;
    if (deviceId === "") {
      setSelectedDevice(null);
      return;
    }
    
    const device = devices.find(d => d._id === deviceId);
    setSelectedDevice(device);
  };
  
  // Kullanıcı bilgilerini formatlama
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

// Settings.jsx dosyasında bölümleri yer değiştirecek şekilde sıraları düzenleyin
// Tüm dosyayı göstermiyorum, sadece render kısmını gösteriyorum:

// ...diğer kodlar aynı kalır (state tanımları, useEffect, handler fonksiyonları)

return (
  <div className="settings-container">
    <h1 className="settings-title">Hesap Ayarları</h1>
    
    {/* Kullanıcı Bilgileri Bölümü */}
    <div className="settings-section user-info-section">
      <h2>Kullanıcı Bilgileri</h2>
      <div className="user-form">
        <div className="form-group">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="E-posta adresiniz"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phoneNumber">Telefon Numarası</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            placeholder="Telefon numaranız"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            placeholder="Kullanıcı adınız"
            className="form-control"
          />
        </div>
        
        <button 
          onClick={handleUpdateUser}
          className="update-button"
        >
          Bilgilerimi Güncelle
        </button>
        
        {updateStatus && (
          <p className={`update-status ${updateStatus === "Bilgileriniz başarıyla güncellendi" ? "success" : "error"}`}>
            {updateStatus}
          </p>
        )}
      </div>
    </div>
    
    {/* Cihaz Ayarları Bölümü */}
    <div className="settings-section device-settings-section">
      <h2>Cihaz Ayarları</h2>
      
      <div className="device-selector">
        <label htmlFor="deviceSelect">Cihaz Seçin</label>
        <select 
          id="deviceSelect" 
          value={selectedDevice ? selectedDevice._id : ""} 
          onChange={handleDeviceSelect}
          className="form-control"
        >
          <option value="">Cihaz seçin</option>
          {devices.map((device) => (
            <option key={device._id} value={device._id}>
              {device.name || device.serialNumber || "İsimsiz Cihaz"}
            </option>
          ))}
        </select>
      </div>
      
      {selectedDevice && (
        <div className="device-settings-form">
          <div className="form-group">
            <label htmlFor="name">Cihaz Adı</label>
            <input
              type="text"
              id="name"
              name="name"
              value={deviceSettings.name}
              onChange={handleDeviceSettingsChange}
              placeholder="Cihaz adı"
              className="form-control"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="minTemperature">Minimum Sıcaklık (°C)</label>
              <input
                type="number"
                id="minTemperature"
                name="minTemperature"
                value={deviceSettings.minTemperature}
                onChange={handleDeviceSettingsChange}
                placeholder="Min. sıcaklık"
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="maxTemperature">Maksimum Sıcaklık (°C)</label>
              <input
                type="number"
                id="maxTemperature"
                name="maxTemperature"
                value={deviceSettings.maxTemperature}
                onChange={handleDeviceSettingsChange}
                placeholder="Max. sıcaklık"
                className="form-control"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="minHumidity">Minimum Nem (%)</label>
              <input
                type="number"
                id="minHumidity"
                name="minHumidity"
                value={deviceSettings.minHumidity}
                onChange={handleDeviceSettingsChange}
                placeholder="Min. nem"
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="maxHumidity">Maksimum Nem (%)</label>
              <input
                type="number"
                id="maxHumidity"
                name="maxHumidity"
                value={deviceSettings.maxHumidity}
                onChange={handleDeviceSettingsChange}
                placeholder="Max. nem"
                className="form-control"
              />
            </div>
          </div>
          
          <button 
            onClick={handleUpdateDevice}
            className="update-button"
          >
            Cihaz Ayarlarını Güncelle
          </button>
          
          {deviceUpdateStatus && (
            <p className={`update-status ${deviceUpdateStatus === "Cihaz ayarları başarıyla güncellendi" ? "success" : "error"}`}>
              {deviceUpdateStatus}
            </p>
          )}
        </div>
      )}
    </div>
    
    {/* BÖLÜMLERİN SIRASI DEĞİŞTİRİLDİ */}
    
    {/* Cihaz Listesi Bölümü - Öne alındı */}
    <div className="settings-section devices-list-section">
      <h2>Kayıtlı Cihazlarım <span className="device-count">({devices.length})</span></h2>
      
      {devices.length > 0 ? (
        <div className="devices-list">
          {devices.map((device) => (
            <div 
              key={device._id} 
              className={`device-card ${selectedDevice && selectedDevice._id === device._id ? 'selected' : ''}`}
              onClick={() => setSelectedDevice(device)}
            >
              <div className="device-header">
                <h3 className="device-name">{device.name || "İsimsiz Cihaz"}</h3>
                <span className="device-serial">SN: {device.serialNumber}</span>
              </div>
              <div className="device-details">
                <div className="detail-row">
                  <span className="detail-label">Sıcaklık Aralığı:</span>
                  <span className="detail-value">{device.minTemperature}°C - {device.maxTemperature}°C</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Nem Aralığı:</span>
                  <span className="detail-value">{device.minHumidity}% - {device.maxHumidity}%</span>
                </div>
                {/* Eklenme Tarihi kaldırıldı */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-devices-message">Henüz kayıtlı cihazınız bulunmamaktadır.</p>
      )}
    </div>
    
    {/* Cihaz Kayıt Formu Bölümü - Sona alındı */}
    <div className="settings-section device-register-section">
      <h2>Cihaz Kaydı</h2>
      <div className="device-register-form">
        <div className="form-group">
          <label htmlFor="deviceSerialNumber">Cihaz Seri Numarası</label>
          <input
            type="text"
            id="deviceSerialNumber"
            value={deviceSerialNumber}
            onChange={(e) => setDeviceSerialNumber(e.target.value)}
            placeholder="Cihaz seri numarasını giriniz"
            className="form-control"
          />
        </div>
        
        {deviceSerialNumber.length >= 5 && (
          <button 
            onClick={handleRegisterDevice} 
            className="register-button"
          >
            Cihazı Kaydet
          </button>
        )}
        
        {registerStatus && (
          <p className={`register-status ${registerStatus === "Cihaz başarıyla kaydedildi" ? "success" : "error"}`}>
            {registerStatus}
          </p>
        )}
      </div>
    </div>
  </div>
);
};

export default Settings;