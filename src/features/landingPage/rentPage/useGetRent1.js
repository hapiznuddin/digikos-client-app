import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../lib/axios"

export const useGetRent1 = ({ id, token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["getRent", id],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const getRent = await axiosInstance.get(`/rent-stage-1?id=${id}`, {
        headers: headers
      })
      return getRent
    },
    onSuccess,
    onError
  })
}
