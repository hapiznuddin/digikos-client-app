import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../lib/axios"

export const useGetRentHistory = ({ token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ['historyRent'],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept : "application/json",
        Authorization: `Bearer ${token}`
      }
      const rentHistory = await axiosInstance.get('/rent-history', { headers: headers })
      return rentHistory
    },
    onSuccess,
    onError
  })
}
