/* eslint-disable react-hooks/rules-of-hooks */
import UserLayoutPage from "../UserLandingPage";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Cookies from "js-cookie";
import { useGetRentHistory } from "../../../../../services/landingPage/userPage/useGetRentHistory";
import StepperComponent from "../../../../Elements/Stepper";
import ButtonPrimary from "../../../../Elements/Button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../../lib/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RentHistorySection = () => {
  const token = Cookies.get("token");
  const [collapsed, setCollapsed] = useState(true);
  const [midtransToken, setMidtransToken] = useState('');
  const navigate = useNavigate();

  const { data } = useGetRentHistory({
    token,
    // onSuccess: (data) => {
    //   console.log(data);
    // },
    onError: (data) => {
      console.log(data);
    },
  });

  // Fungsi untuk mengubah format tanggal

  const rupiahFormatter = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }

  const {mutate} = useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization : `Bearer ${token}`,
      }
      const payment = await axiosInstance.post("/first-payment", body, {headers: headers})
      return payment
    },
    onSuccess: (data) => {
      setMidtransToken(data?.data.token)
    },
    onError: (data) => {
      console.log(data)
    }
  })

  const {mutate: webhookMidtrans} = useMutation({
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
    },
    onError: (data) => {
      console.log(data)
    }
  })

  useEffect(() => {
    if (midtransToken) {
      window.snap.pay(midtransToken, {
        onSuccess: (result) => {
          console.log(result);
          Cookies.set("pembayaranMidtrans", JSON.stringify(result));
          setMidtransToken('');
          webhookMidtrans(
            result
          )
          Swal.fire({
            title: "Berhasil",
            text: "Pembayaran Berhasil",
            icon: "success",
            timer: 1500,
          })
        },
        onPending: (result) => {
          Cookies.set("pembayaranMidtrans", JSON.stringify(result));
          setMidtransToken('');
          navigate("/user/riwayatPengajuanSewa");
        },
        onError: (error) => {
          Swal.fire({
            title: "Gagal",
            text: 'Pembayaran Gagal',
            icon: "error",
            timer: 1500,
          })
          console.log(error);
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
        }
      })
    }
  }, [ midtransToken, navigate, webhookMidtrans ]);

  useEffect(() => {
    const midtransUrl = `${import.meta.env.VITE_MIDTRANS_SNAP}`;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = `${import.meta.env.VITE_MIDTRANS_CLIENT_KEY}`;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [])
  return (
    <UserLayoutPage>
      <div className="w-full  mx-auto flex flex-col gap-8 py-8 px-4">
        <h1 className="text-neutral-800 text-lg  lg:text-xl font-semibold">
          Riwayat Pengajuan Sewa
        </h1>

        {data?.data.map((rent, index) => {
          const imgRoom = `${import.meta.env.VITE_DIGIKOS_URL}${rent.room_image?.path}`
          return (
            <div
              key={index}
              className="flex flex-col gap-8 border rounded-xl shadow-md p-4 md:p-6"
            >
              <div className="flex flex-col">
                <div className="badge bg-warning-200 text-warning-700">{rent.status}</div>
                <div className="divider" />
                <div className="flex flex-col md:flex-row w-full gap-4 ">
                  <div className="w-full h-32 md:w-60 lg:w-60 md:h-32 bg-cover bg-center rounded-xl overflow-hidden">
                    <img
                  src={imgRoom}
                  className="h-full w-full aspect-video object-cover object-center rounded-xl"
                />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-neutral-800 text-base md:text-lg font-semibold">
                      {rent.classroom?.name}
                    </h1>
                    <p className="text-neutral-600 text-sm md:text-base">{rent.classroom?.size}</p>
                    <p className="text-neutral-600 text-sm md:text-base">
                      lantai {rent.room?.floor} nomor {rent.room?.number_room}
                    </p>
                    <p className="text-neutral-600 text-sm md:text-base">
                      Tanggal masuk{" "}
                      <span className="text-neutral-800 font-medium">
                        {rent.start_date}
                      </span>
                    </p>
                    <p className="text-neutral-600 text-sm md:text-base">
                      <span className="text-neutral-800 font-semibold">
                        {rupiahFormatter(rent.total_price)}
                      </span>
                      /{rent.payment_term}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-start w-full">
                <StepperComponent status={rent.status_id}/>
              </div>
              <div
                className={`flex flex-col gap-6 overflow-hidden transition-max-h duration-500 ease-in-out ${
                  collapsed ? "max-h-0" : "max-h-screen"
                }`}
              >
                <div className="divider -my-2" />
                <div className="flex flex-col">
                  <h1 className="text-neutral-800 lg:text-lg font-semibold mb-5">
                    Data Penyewa
                  </h1>
                  <div className="flex justify-between mb-4">
                    <p className="text-neutral-600 text-sm md:text-base">
                      Nama
                    </p>
                    <p className="text-neutral-700 text-sm md:text-base font-medium">
                      {rent.occupant?.name}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-neutral-600 text-sm md:text-base">
                      No Handphone
                    </p>
                    <p className="text-neutral-700 text-sm md:text-base font-medium">
                      {rent.occupant?.phone}
                    </p>
                  </div>
                  {rent.additional_occupant ? (<div className="flex justify-between mt-4">
                <p className="text-neutral-600 text-sm md:text-base">
                  Tambahan penghuni
                </p>
                <p className="text-neutral-700 text-sm md:text-base font-medium">
                {rent.additional_occupant}
                </p>
              </div>) : null}
                </div>
                <div className="divider -my-2" />
                <div className="flex flex-col">
                  <h1 className="text-neutral-800 lg:text-lg font-semibold mb-5">
                    Rincian pembayaran pertama
                  </h1>
                  <div className="flex justify-between mb-4">
                    <p className="text-neutral-600 text-sm md:text-base">
                      Biaya sewa kos
                    </p>
                    <p className="text-neutral-800 text-sm md:text-base font-semibold">
                      {rupiahFormatter(rent.total_price)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-neutral-600 text-sm md:text-base">
                      Deposit
                    </p>
                    <p className="text-neutral-800 text-sm md:text-base font-semibold">
                      {rupiahFormatter(rent.classroom?.deposit)}
                    </p>
                  </div>
                  {rent.additional_occupant ? (<div className="flex justify-between mt-4">
                <p className="text-neutral-600 text-sm md:text-base">
                  Tambahan penghuni
                </p>
                <p className="text-neutral-800 text-sm md:text-base font-semibold">
                {rupiahFormatter(300000)}
                </p>
              </div>):null}
                </div>
                <div className="divider -my-2" />
                <div className="flex justify-between">
                  <p className="text-neutral-800 text-sm md:text-base lg:text-lg font-semibold">
                    Total Pembayaran
                  </p>
                  <p className="text-neutral-800 text-base md:text-lg lg:text-xl font-semibold">
                    {rupiahFormatter(rent.total_payment)}
                  </p>
                </div>
              </div>
              <div className="divider -my-4" />
              <div className="flex gap-1 justify-center w-full hover:underline text-primary-500">
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="font-medium text-sm md:text-base"
                >
                  {collapsed ? "Lihat lebih banyak" : "Lihat lebih sedikit"}
                </button>
                {collapsed ? (
                  <BiChevronDown size={24} />
                ) : (
                  <BiChevronUp size={24} />
                )}
              </div>
              <div className="divider -my-4" />
              <ButtonPrimary className="text-sm md:text-lg font-medium" disabled={`${rent.status_id === 2 ? 'disabled': ''}`} onClick={() => mutate({price: rent.total_payment,
          room_id: rent.room_id,
          rent_id: rent.id,
          occupant_id: rent.occupant_id})} >Bayar Sekarang</ButtonPrimary>
            </div>
          );
        })}
      </div>
    </UserLayoutPage>
  );
};

export default RentHistorySection;
