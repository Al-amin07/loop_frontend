import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json',
    // }
});

// Simple interceptor to handle unauthorized access
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Clear stored user data and redirect to login
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error?.response?.data);
    }
);

export default api;