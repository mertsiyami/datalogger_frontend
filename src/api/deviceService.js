import apiClient from './serviceHelper'; // apiClient'ı import ediyoruz

const deviceService = {
  // MyDevices fonksiyonu
  myDevices: async () => {
    try {
      // My Devices API isteği
      const response = await apiClient.get('/device/mydevices');
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  },

  // Assign fonksiyonu
  assign: async (data) => {
    try {
      // Device Assign API isteği
      const response = await apiClient.post('/device/assign', data);
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  },

  // Update fonksiyonu
  update: async (data) => {
    try {
      // Device Update API isteği
      const response = await apiClient.put('/device', data);
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  },

  getDevices : async () => {
    try {
      const response = await apiClient.post('device/getDevices');
      return response.data.devices
    }
    catch(error)
    {
      throw error;
    }
  },

  registerDeviceToUser : async (data) => {

    try {
      const response = await apiClient.post('/user/addDevice',data);
      return response.data
    }
    catch(error)
    {
      throw error;
    }
  }

};

export default deviceService;
