import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useRentApply = ({token, onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const pengajuanTahap1 = await axiosInstance.post("/rent-stage-1", body, {
        headers,
      });
      return pengajuanTahap1.data;
    },
    onSuccess,
    onError
  });
}
