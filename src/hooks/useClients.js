import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";

export function useClients() {
    return useQuery({
        queryKey: ['clients'],
        queryFn: async () => {
            return await api.get('/clients/')
        }
    })
}

export function useClient(id) {
    return useQuery({
        queryKey: ['clients', id],
        queryFn: async () => {
            return await api.get(`/clients/${id}/`)
        },
        enabled: !!id
    })
}

export function useCreateClient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (newClient) => {
            return await api.post('/clients/', newClient)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
        }
    })
}

export function useUpdateClient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }) => {
            return await api.patch(`/clients/${id}/`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
        }
    })
}

export function useDeleteClient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id) => {
            return await api.delete(`/clients/${id}/`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
        }
    })
}