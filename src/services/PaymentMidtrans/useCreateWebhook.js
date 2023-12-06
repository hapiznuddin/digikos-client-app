import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useCreateWebhook = ({ onSuccess, onError, token }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization : `Bearer ${token}`,
      }
      const webhookPayment = await axiosInstance.post("/webhook-payment", body, {headers: headers})
      return webhookPayment
    },
    onSuccess,
    onError
  })
}
