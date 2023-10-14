import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useUploadKK = ({ token, setUploadProgressKK, onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const uploadKtp = await axiosInstance.post('/occupant/family-doc', body, {headers: headers,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgressKK(percentCompleted);
        },
    })
      return uploadKtp
    },
    onSuccess,
    onError
  });
}
