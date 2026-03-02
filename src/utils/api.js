import { getAuthToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken()

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Token ${token}` }),
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error ${response.status}: ${error || response.statusText}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export const api = {
    get: (endpoint) =>
        apiRequest(endpoint, { method: 'GET' }),

    post: (endpoint, data) =>
        apiRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        }),
    
    put: (endpoint, data) =>
        apiRequest(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
    
    patch: (endpoint, data) => 
        apiRequest(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data)
        }),
    
    delete: (endpoint) => 
        apiRequest(endpoint, { method: 'DELETE' })
};