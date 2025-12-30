const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export async function loginUser(username, password) {
    const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
        const error = await response.json()

        const errorMessage = 
            error.non_field_errors?.[0] ||
            error.detail ||
            'Invalid credentials'

        throw new Error(errorMessage)
    }

    const data = await response.json()
    return data.token
}

export function saveAuthToken(token) {
    localStorage.setItem('authToken', token)
}

export function getAuthToken() {
    return localStorage.getItem('authToken')
}

export function removeAuthToken() {
    localStorage.removeItem('authToken')
}

export function isAuthenticated() {
    return !!getAuthToken()
}