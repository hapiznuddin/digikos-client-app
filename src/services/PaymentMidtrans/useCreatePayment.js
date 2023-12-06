import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useCreatePayment = ({ onSuccess, onError, token }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization : `Bearer ${token}`,
      }
      const payment = await axiosInstance.post("/first-payment", body, {headers: headers})
      return payment
    },
    onSuccess,
    onError
  })
}
