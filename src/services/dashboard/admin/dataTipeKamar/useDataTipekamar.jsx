import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useAddTipekamar = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const req = await axiosInstance.post(`/class-room`, body, {headers: headers});
      return req;
    },
    onSuccess,
    onError
  })
}

export const useEditTipekamar = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const req = await axiosInstance.put(`/class-room`, body, {headers: headers});
      return req;
    },
    onSuccess,
    onError
  })
}

export const useDeleteTipekamar = ({ token, onSuccess, onError }) => {
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
      const req = await axiosInstance.delete(`/class-room`, config);
      return req;
    },
    onSuccess,
    onError
  })
}
