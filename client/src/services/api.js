import axios from 'axios';
import { handleMockRequest } from './mockData';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        localStorage.removeItem('userInfo');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with graceful offline/Vercel fallback
api.interceptors.response.use(
  (response) => {
    // Detect if SPA rewrite served index.html instead of actual API JSON response
    if (
      typeof response.data === 'string' &&
      (response.data.trim().startsWith('<!doctype') || response.data.trim().startsWith('<html'))
    ) {
      console.warn('API returned HTML (SPA fallback). Using built-in demo catalog data for:', response.config?.url);
      const mockResult = handleMockRequest(
        response.config?.url || '',
        response.config?.method || 'get',
        response.config?.data ? (typeof response.config.data === 'string' ? JSON.parse(response.config.data) : response.config.data) : null
      );
      return {
        ...response,
        data: mockResult,
        status: 200,
      };
    }
    return response;
  },
  (error) => {
    const originalConfig = error.config;

    // Handle token expiration
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('userInfo')) {
        console.warn('Session expired. Logging out.');
        localStorage.removeItem('userInfo');
        window.dispatchEvent(new Event('auth-logout'));
      }
    }

    // If backend is unreachable (offline, 404 on API endpoint, network down)
    // Fall back to built-in mock catalog so client never crashes
    if (
      originalConfig &&
      (!error.response || error.response.status === 404 || error.response.status === 502 || error.response.status === 503 || error.code === 'ERR_NETWORK')
    ) {
      console.warn('Backend unavailable, serving demo catalog for:', originalConfig.url);
      try {
        let parsedData = originalConfig.data;
        if (typeof parsedData === 'string') {
          try {
            parsedData = JSON.parse(parsedData);
          } catch (_) {}
        }
        const mockResult = handleMockRequest(originalConfig.url || '', originalConfig.method || 'get', parsedData);
        return Promise.resolve({
          data: mockResult,
          status: 200,
          statusText: 'OK (Demo Fallback)',
          headers: {},
          config: originalConfig,
        });
      } catch (mockErr) {
        console.error('Mock fallback error:', mockErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
