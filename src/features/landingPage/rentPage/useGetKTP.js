import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../lib/axios"

export const useGetKTP = ({ id, token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ['getKtpFile'],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const getKtp = await axiosInstance.get(`/occupant/ktp-doc?id=${id}`, {headers: headers})
      return getKtp
    },
    onSuccess,
    onError
  })
}
