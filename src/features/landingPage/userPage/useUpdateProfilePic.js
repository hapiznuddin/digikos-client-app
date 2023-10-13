import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useUpdateProfilePic = ({ token, setUploadProgress, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const updateProfilePic = await axiosInstance.post(
        "/occupant/profile-pic/update",
        body,
        {
          headers: headers,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      return updateProfilePic;
    },
    onSuccess,
    onError
  });
}
