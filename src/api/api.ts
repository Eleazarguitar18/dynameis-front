import axios from "axios";
import { url_base } from "../constants/url_base";

const api = axios.create({
  baseURL: `${url_base}`,
});

// 1. Interceptor de Peticiones: Inyecta el token de acceso
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Interceptor de Respuestas: Maneja el Refresh Token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos reintentado ya esta petición
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Si ni siquiera hay refresh token, no intentamos nada y mandamos al login
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Llamada al endpoint de refresh según tu estructura de NestJS
        const res = await axios.post(
          `${url_base}/auth/refresh_token`,
          {}, // Body vacío
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`, // NestJS lee el refresh desde aquí
            },
          }
        );

        if (res.status === 200 || res.status === 201) {
          const newAccessToken = res.data.access_token;
          const newRefreshToken = res.data.refresh_token;

          // Guardamos el nuevo access token
          localStorage.setItem("token", newAccessToken);
          
          // Si el backend también refresca el refresh_token, lo actualizamos
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }

          // Actualizamos el header de la petición original y la reintentamos
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh (token expirado o inválido), limpieza total
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        
        // Redirigir al login solo si no estamos ya en él para evitar bucles
        if (!window.location.pathname.includes("/signin")) {
          window.location.href = "/signin";
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;