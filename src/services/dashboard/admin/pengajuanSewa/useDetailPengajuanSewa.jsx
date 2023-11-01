import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios';

export const useGetDetailPengajuanSewa = ({ token, onSuccess, onError, idRef }) => {
  return useQuery({
    queryKey: ["detailPengajuanSewa"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/rent/detail?id=${idRef}`, {
        headers: headers,
      });
      return res;
    },
    onSuccess,
    onError
  });
}


export const useApprovePengajuanSewa = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const req = await axiosInstance.post(`/rent-approval/admin`, body, {
        headers: headers,
      });
      return req;
    },
    onSuccess,
    onError
  });
}


export const useApproveCheckIn = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const req = await axiosInstance.post(`/rent-approval/check-in`, body, {
        headers: headers,
      });
      return req;
    },
    onSuccess,
    onError
  });
}

