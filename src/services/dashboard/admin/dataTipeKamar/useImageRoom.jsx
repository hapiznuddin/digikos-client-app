import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useAddImageRoom = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const req = await axiosInstance.post(`/class-room/image`, body, {
        headers: headers,
      });
      return req;
    },
    onSuccess,
    onError
  });
}

export const useUpdateImageRoom = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const req = await axiosInstance.post(`/class-room/image/update`, body, {
        headers: headers,
      });
      return req;
    },
    onSuccess,
    onError
  });
}

export const useDeleteImageRoom = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const config = {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: body,
      };
      const req = await axiosInstance.delete(`/class-room/image`, config);
      return req;
    },
    onSuccess,
    onError
  });
}


