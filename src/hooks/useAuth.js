import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, saveAuthToken, removeAuthToken, isAuthenticated, registerUser, saveUserInfo } from "../utils/auth";

export function useLogin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ username, password }) => {
            const response = await loginUser(username, password)
            return response
        },
        onSuccess: (response) => {
            saveAuthToken(response.token)
            saveUserInfo(response.user)
            queryClient.invalidateQueries()
        }
    })
}

export function useLogout() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            removeAuthToken()
        },
        onSuccess: () => {
            queryClient.clear()
        },
    })
}

export function useIsAuthenticated() {
    return isAuthenticated()
}

export function useRegister() {
    return useMutation({
        mutationFn: async (userData) => {
            return await registerUser(userData);
        }
    })
}