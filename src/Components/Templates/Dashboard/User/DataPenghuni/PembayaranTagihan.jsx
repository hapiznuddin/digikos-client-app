/* eslint-disable react/display-name */
import { AiOutlineClose } from "react-icons/ai";
import ButtonPrimary from "../../../../Elements/Button";
import { forwardRef, useEffect } from "react";
import Cookies from "js-cookie";
import { useGetCheckInvoice } from "../../../../../services/dashboard/user/penghuni/useGetCheckInvoice";
import PropTypes from "prop-types";
import { useCreatePayment } from "../../../../../services/PaymentMidtrans/useCreatePayment";
import { useCreateWebhook } from "../../../../../services/PaymentMidtrans/useCreateWebhook";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PembayaranTagihan = forwardRef(({ refetch }, ref) => {
  PembayaranTagihan.propTypes = {
    refetch: PropTypes.func,
  };
  const idRef = ref.current;
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [midtransToken, setMidtransToken] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  const currentDate = new Date();
  const tanggal = currentDate.getDate(); // Mendapatkan tanggal (1-31)
  const bulan = currentDate.getMonth() + 1; // Mendapatkan bulan (0-11); +1 karena bulan dimulai dari 0 (Januari)
  const tahun = currentDate.getFullYear(); // Mendapatkan tahun (contoh: 2023)
  const tanggalSekarang = `${tahun}-${bulan < 10 ? "0" : ""}${bulan}-${
    tanggal < 10 ? "0" : ""
  }${tanggal}`;

  const dateFormatter = (date) => {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("id-ID", options);
  };
  const monthFormatter = (date) => {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
    };
    return newDate.toLocaleDateString("id-ID", options);
  };

  const rupiahFormatter = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const { data, isLoading } = useGetCheckInvoice({
    token,
    idRef,
    onError: () => {
      setIsPaid(true);
    },
  });

  const { mutate: payment, isLoading: isLoadingPayment } = useCreatePayment({
    token,
    onSuccess: (data) => {
      refetch();
      setMidtransToken(data?.data.token);
    },
  });

  const { mutate: webhookMidtrans } = useCreateWebhook({
    token,
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (midtransToken) {
      window.snap.pay(midtransToken, {
        onSuccess: (result) => {
          refetch();
          console.log(result);
          Cookies.set("pembayaranMidtrans", JSON.stringify(result));
          setMidtransToken("");
          webhookMidtrans(result);
          Swal.fire({
            title: "Berhasil",
            text: "Pembayaran Berhasil",
            icon: "success",
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        },
        onPending: (result) => {
          Cookies.set("pembayaranMidtrans", JSON.stringify(result));
          setMidtransToken("");
        },
        onError: (error) => {
          Swal.fire({
            title: "Gagal",
            text: "Pembayaran Gagal",
            icon: "error",
            timer: 1500,
          });
          console.log(error);
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
        },
      });
    }
  }, [midtransToken, navigate, webhookMidtrans, refetch]);

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
  }, []);

  return (
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <AiOutlineClose size={20} />
        </button>
      </form>
      <h1 className="text-neutral-800 text-base md:text-xl font-semibold mb-4">
        Pembayaran Tagihan
      </h1>
      <div className="flex flex-col gap-6 items-center">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg py-8 text-primary-500"></span>
        ) : isPaid ? (
          <>
          <div className="flex w-full bg-error-200 rounded-lg justify-center">
            <p className="text-center text-lg font-semibold py-4">
              Tagihan sudah dibayar
            </p>
          </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 w-full">
              <p className="font-medium text-base md:text-lg">Tagihan</p>
              <div className="input input-bordered flex items-center w-full rounded-full text-lg hover:border-primary-500">
                <p>{monthFormatter(data?.invoice_date)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="font-medium text-base md:text-lg">
                Tanggal Pembayaran
              </p>
              <div className="input input-bordered flex items-center w-full rounded-full text-lg hover:border-primary-500">
                <p>{dateFormatter(tanggalSekarang)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="font-medium text-base md:text-lg">Total Tagihan</p>
              <div className="input input-bordered flex items-center w-full rounded-full text-lg hover:border-primary-500">
                <p>{rupiahFormatter(data?.price)}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="modal-action mt-8">
        <form method="dialog" className="w-full ">
          <ButtonPrimary className="w-full text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300">
            Batal
          </ButtonPrimary>
        </form>
        <form method="dialog" className="flex w-full">
          <ButtonPrimary
            className="w-full text-lg font-medium"
            type={"submit"}
            onClick={() => {
              payment({
                occupant_id: data.occupant_id,
                room_id: data.room_id,
                rent_id: data.rent_id,
                price: data.price,
              });
            }}
            disabled={isPaid}
          >
            {isLoadingPayment ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              "Bayar Sekarang"
            )}
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
});

export default PembayaranTagihan;
