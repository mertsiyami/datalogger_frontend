import apiClient from './serviceHelper'; // apiClient'ı import ediyoruz

const userService = {
  // Register fonksiyonu
  register: async (data) => {
    try {
      // Register API isteği
      const response = await apiClient.post('/user', data);
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  },

  // Login fonksiyonu
  login: async (data) => {
    try {
      // Login API isteği
      const response = await apiClient.post('/user/login', data);
      return response.data; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  },
};

export default userService;
