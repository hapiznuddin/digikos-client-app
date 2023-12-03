import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../../lib/axios"

export const useGetOccupantByRent = ({ token, idRef, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["getOccupant", idRef],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const res = await axiosInstance.get(`/rent/detail/user?user_id=${idRef}`, { headers})
      return res.data
    },
    onSuccess,
    onError
  })
}
