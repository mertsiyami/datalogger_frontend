import apiClient from './serviceHelper'; // apiClient'ı import ediyoruz

const deviceService = {
  // MyDevices fonksiyonu
  myDevices: async () => {
    try {
      // My Devices API isteği
      const response = await apiClient.get('/devices/mydevices');
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  },

  // Assign fonksiyonu
  assign: async (data) => {
    try {
      // Device Assign API isteği
      const response = await apiClient.post('/devices/assign', data);
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  },

  // Update fonksiyonu
  update: async (data) => {
    try {
      // Device Update API isteği
      const response = await apiClient.put('/devices', data);
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  }
};

export default deviceService;
