import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../lib/axios"

export const useGetKK = ({ id, token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ['getKkFile'],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const getKk = await axiosInstance.get(`/occupant/family-doc?id=${id}`, {headers: headers})
      return getKk
    },
    onSuccess,
    onError
  })
}
