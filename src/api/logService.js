import apiClient from './serviceHelper'; // apiClient'ı import ediyoruz

const logService = {
  // Logs by deviceId fonksiyonu
  logsByDeviceId: async (deviceId) => {
    try {
      // Logs API isteği
      const response = await apiClient.get(`/logs/${deviceId}`);
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  }
};

export default logService;
