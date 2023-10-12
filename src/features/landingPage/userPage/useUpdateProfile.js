import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useUpdateProfile = ({token, onSuccess, onError}) => {
  return useMutation({
    mutationFn: (body) => {
      const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const userProfile = axiosInstance.put("/occupant", body, {
        headers: headers,
      });
      return userProfile;
    },
    onSuccess,
    onError
  });

}
