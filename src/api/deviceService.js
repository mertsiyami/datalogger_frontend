import apiClient from './serviceHelper';

const deviceService = {
  // MyDevices fonksiyonu
  myDevices: async () => {
    try {
      // My Devices API isteği
      const response = await apiClient.get('/device/mydevices');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update fonksiyonu
  update: async (data) => {
    try {
      // Device Update API isteği
      const response = await apiClient.put('/device', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cihazları getirme fonksiyonu
  getDevices: async () => {
    try {
      const response = await apiClient.post('device/getDevices');
      return response.data.devices;
    } catch (error) {
      throw error;
    }
  },

  // Cihaz kaydetme fonksiyonu - artık tek bir fonksiyon
  addDevice: async (data) => {
    try {
      const response = await apiClient.post('/user/addDevice', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default deviceService;