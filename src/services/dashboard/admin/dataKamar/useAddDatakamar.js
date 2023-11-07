import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useAddDatakamar = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const req = await axiosInstance.post(`/room`, body, { headers });
      return req;
    },
    onSuccess,
    onError
  });
}
