import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

export function useServices() {
    return useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            return await api.get('/services/')
        }
    })
}

export function useService(id) {
    return useQuery({
        queryKey: ['services', id],
        queryFn: async () => {
            return await api.get(`/services/${id}/`)
        },
        enabled: !!id
    })
}