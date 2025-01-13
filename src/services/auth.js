import { toast } from 'react-toastify';
import api from './api';

export const authService = {

    async login(email, password) {
        try {
            const response = await api.post(`/auth/login`, { email, password });
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                return response.data.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            toast.error(error.message || 'Login failed');
            throw error;
        }
    },

    async register(fullName, email, password) {
        try {
            const response = await api.post('/auth/register', {
                fullName,
                email,
                password,
            });
            return response.data.data;
        } catch (error) {
            toast.error(error.message || 'Registration failed');
            throw error;
        }
    },

    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('user');
        }
    },

    async getCurrentUser() {
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                throw new Error('No active session');
            }
            return JSON.parse(storedUser);
        } catch (error) {
            localStorage.removeItem('user');
            throw error;
        }
    }
}; 