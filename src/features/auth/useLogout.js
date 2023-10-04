import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useLogout = ({token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async () => {
      const headers = {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const logout = await axiosInstance.post("/logout", null, {headers});
      return logout;
    },
    onSuccess,
    onError
  });
}
