import apiClient from './serviceHelper';

const userService = {
  // Register fonksiyonu
  register: async (data) => {
    try {
      // Register API isteği
      const response = await apiClient.post('/user', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login fonksiyonu
  login: async (data) => {
    try {
      // Login API isteği
      const response = await apiClient.post('/user/login', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Kullanıcı bilgilerini getirme fonksiyonu
  getUserInfo: async () => {
    try {
      // Kullanıcı bilgisi API isteği
      const response = await apiClient.get('/user/getDetails');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Kullanıcı bilgilerini güncelleme fonksiyonu
  update: async (data) => {
    try {
      // Kullanıcı güncelleme API isteği
      const response = await apiClient.put('/user/update', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;