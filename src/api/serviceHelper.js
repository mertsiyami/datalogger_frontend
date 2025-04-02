import axios from 'axios';
//require('dotenv').config();


// Axios instance oluşturuluyor
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL'i belirliyoruz
  headers: {
    'Content-Type': 'application/json', // JSON formatında veri gönderileceğini belirtiyoruz
  },
});

// Request interceptor ekliyoruz
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // localStorage'dan authToken alınır
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Token varsa Authorization header'ına eklenir
  }
  return config; // Konfigürasyonu döndürüyoruz
});

// Response interceptor ekliyoruz
apiClient.interceptors.response.use(
  (response) => {
    return response; // Yanıt başarılıysa olduğu gibi döndürülür
  },
  (error) => {
    //console.log(error)
    // Hata durumunda
    if (error.response) {
      const statusCode = error.response.status; // Hata kodu alınır

      if (statusCode === 401) {
        // 401 hatası alındığında token temizlenir ve kullanıcı login sayfasına yönlendirilir
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error); // Hata döndürülür
  }
);

export default apiClient; // Axios client'ı dışa aktarılır
