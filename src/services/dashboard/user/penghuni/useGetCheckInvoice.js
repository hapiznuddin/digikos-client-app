import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../../lib/axios"

export const useGetCheckInvoice = ({ onSuccess, onError, token, idRef }) => {
  return useQuery({
    queryKey: ["checkTagihan", idRef],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const res = await axiosInstance.get(`/invoice/check?user_id=${idRef}`, { headers })
      return res.data
    },
    onSuccess,
    onError
  })
}
