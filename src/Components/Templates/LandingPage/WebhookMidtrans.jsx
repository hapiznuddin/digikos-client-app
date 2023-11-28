import Cookies from "js-cookie";
import ButtonPrimary from "../../Elements/Button"
import LandingPageLayout from "../../Layouts/LandingPageLayout"
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";

const WebhookMidtrans = () => {
  const token = Cookies.get("token");
  const midtransResponse = JSON.parse(Cookies.get("pembayaranMidtrans"));
  const navigate = useNavigate();
  
  const {mutate, isLoading} = useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization : `Bearer ${token}`,
      }
      const webhookPayment = await axiosInstance.post("/webhook-payment", body, {headers: headers})
      return webhookPayment
    },
    onSuccess: (data) => {
      console.log(data)
      navigate("/user/riwayatPengajuanSewa")
    },
    onError: (data) => {
      console.log(data)
    }
  })

  return (
    <LandingPageLayout>
    <div className='flex flex-col justify-center items-center w-full py-20 gap-6'>
        <img src="/bg-webhook-midtrans.webp" className="w-64 md:w-72" />
        <h1 className="text-neutral-900 text-lg md:text-xl lg:text-2xl font-semibold">Pembayaran Berhasil</h1>
        <p className="text-neutral-600 text-sm md:text-base font-medium">Silakan kembali ke halaman sebelumnya</p>
        <ButtonPrimary className="text-lg font-medium w-40" onClick={() => mutate(midtransResponse)}>{isLoading ? (<span className="loading loading-spinner loading-md"></span>) : 'Kembali'}</ButtonPrimary>
    </div>
    </LandingPageLayout>
  )
}

export default WebhookMidtrans