import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";

export function useVisits(clientId = null) {
    const queryString = clientId ? `?client_id=${clientId}` : '';

    return useQuery({
        queryKey: ['visits', clientId],
        queryFn: async () => {
            return await api.get(`/visits/${queryString}`)
        },
        enabled: !!clientId
    })
}

export function useVisit(id) {
    return useQuery({
        queryKey: ['visits', id],
        queryFn: async () => {
            return await api.get(`/visits/${id}/`)
        },
        enabled: !!id
    })
}

export function useCreateVisit() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (newVisit) => {
            return await api.post('/visits/', newVisit)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visits'] })
        }
    })
}

export function useUpdateVisit() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }) => {
            return await api.patch(`/visits/${id}/`,
                data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visits'] })
        }
    })
}

export function useDeleteVisit() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id) => {
            return await api.delete(`/visits/${id}/`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visits'] })
        }
    })
}

export function useVisitServices(visitId) {
    return useQuery({
        queryKey: ['visits', visitId, 'services'],
        queryFn: async () => {
            return await api.get(`/visitservices/?visit_id=${visitId}`)
        },
        enabled: !!visitId
    })
}
