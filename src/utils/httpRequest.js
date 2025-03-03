import axios from 'axios';
import Cookies from 'js-cookie';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
    baseURL: 'http://localhost:8081', // Địa chỉ base URL của API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để tự động cập nhật token trước mỗi request
api.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Các phương thức chung cho các yêu cầu API

// GET request
export const get = async (url) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('GET request failed:', error.response?.data || error.message);
        throw error;
    }
};

// POST request
export const post = async (url, data) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error('POST request failed:', error.response?.data || error.message);
        throw error;
    }
};

// PUT request
export const put = async (url, data) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error('PUT request failed:', error.response?.data || error.message);
        throw error;
    }
};

// DELETE request
export const del = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        console.error('DELETE request failed:', error.response?.data || error.message);
        throw error;
    }
};

export default api;
