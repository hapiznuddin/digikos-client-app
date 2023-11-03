import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../../lib/axios"

export const useGetDetailTipeKamar = ({ id, token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ['detailTipeKamar'],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept : "application/json",
        Authorization: `Bearer ${token}`
      }
      const res = await axiosInstance.get(`/class-room/detail?id=${id}`, { headers: headers })
      return res
    },
    onSuccess,
    onError
    })
}
