import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useUploadKTP = ({ token, setUploadProgress, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const uploadKtp = await axiosInstance.post('/occupant/ktp-doc', body, {headers: headers,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
    })
      return uploadKtp
    },
    onSuccess,
    onError
  });
}
