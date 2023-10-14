import Cookies from "js-cookie";
import ButtonPrimary from "../../../Elements/Button";
import InputField from "../../../Elements/Input";
import SelectLantai from "../../../Elements/Select/SelectLantai";
import SelectNoKamar from "../../../Elements/Select/SelectNoKamar";
import SelectPembayaran from "../../../Elements/Select/SelectPembayaran";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRentApply } from "../../../../features/landingPage/roomPage/useRentApply";

const InputPengajuan = ({ hargaKamar }) => {
  InputPengajuan.propTypes = {
    hargaKamar: PropTypes.number,
  };
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [pembayaran, setPembayaran] = useState("bulan");
  const [harga, setHarga] = useState(hargaKamar);
  const [lantai, setLantai] = useState("");

  const rupiahFormatter = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  useEffect(() => {
    if (pembayaran === "bulan") {
      setHarga(hargaKamar);
    } else if (pembayaran === "6 bulan") {
      setHarga(hargaKamar * 6);
    } else if (pembayaran === "tahun") {
      setHarga(hargaKamar * 12);
    }
  }, [pembayaran, hargaKamar]);

  useEffect(() => {
    const isLoggedIn = () => {
      return token !== undefined;
    };
    if (isLoggedIn()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      start_date: "",
      payment_term: "bulan",
      floor: "",
      number_room: "",
    },
    onSubmit: async () => {
      const { start_date, number_room } = formik.values;
      mutate({
        start_date,
        number_room,
        payment_term: pembayaran,
        total_price: harga,
      });
    },
    validationSchema: yup.object().shape({
      start_date: yup.string().required("Tanggal wajib diisi"),
      payment_term: yup.string().required("Jangka pembayaran wajib diisi"),
      floor: yup.string().required("Lantai wajib diisi"),
      number_room: yup.string().required("Nomor kamar wajib diisi"),
    }),
  });

  const { mutate, isLoading } = useRentApply({
    token,
    onSuccess: (data) => {
      console.log(data.rent_id);
      Swal.fire({
        title: "Berhasil",
        text: "Pengajuan berhasil",
        icon: "success",
        timer: 1500,
      }).then(() => {
        navigate(`/pengajuanSewa/${data.rent_id}`);
      });
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const { start_date, number_room, payment_term, floor } = formik.errors;

  return (
    <>
      <div className="hidden lg:sticky lg:top-28 lg:flex lg:flex-col gap-6 w-2/5 h-full bg-neutral-25 shadow-lg rounded-3xl border border-neutral-100 p-4">
        <div className="flex items-end">
          <p className="text-neutral-800 text-3xl font-bold">
            {rupiahFormatter(harga)}
          </p>
          <p className="text-neutral-800 text-xl font-medium">/{pembayaran}</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-col gap-1">
              <InputField
                type="date"
                label="Mulai Kost"
                name="start_date"
                classNameLabel="md:text-base"
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{start_date}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <SelectPembayaran
                label="Jangka Pembayaran"
                classNameLabel="md:text-base"
                className="text-lg"
                name="payment_term"
                value={pembayaran}
                onChangeCapture={(e) => setPembayaran(e.target.value)}
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{payment_term}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
            <SelectLantai
              label="Lantai"
              classNameLabel="md:text-base"
              name="floor"
              value={lantai}
              onChangeCapture={(e) => setLantai(e.target.value)}
              onChange={handleForm}
            />
            {formik.errors ? (
                <p className="text-error-500 text-sm">{floor}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
            <SelectNoKamar
              label="Nomor Kamar"
              classNameLabel="md:text-base"
              name="number_room"
              floor={lantai}
              onChange={handleForm}
            />
            {formik.errors ? (
                <p className="text-error-500 text-sm">{number_room}</p>
              ) : null}
            </div>
          </div>
          {isLogin ? (
            <ButtonPrimary type="submit" className=" text-lg font-medium mt-6">
              {isLoading ? (
                <span className="loading loading-infinity loading-lg"></span>
              ) : (
                "Ajukan Sewa"
              )}
            </ButtonPrimary>
          ) : (
            <>
              <p className="text-error-600 text-sm mt-2">
                Silahkan login terlebih dahulu untuk melanjutkan
              </p>
              <ButtonPrimary className="btn-disabled text-lg font-medium mt-2">
                Ajukan Sewa
              </ButtonPrimary>
            </>
          )}
        </form>
      </div>
      <div className="btm-nav h-[140px] lg:hidden bg-neutral-25 shadow-[0_-3px_4px_0_rgba(0,0,0,0.05)]">
        <div className="flex flex-col w-full gap-2 justify-end mb-12 px-12">
          <div className="flex justify-center w-full">
            <p className="text-neutral-800 text-2xl font-bold">
              {rupiahFormatter(harga)}
            </p>
            <p className="text-neutral-800 text-lg font-medium">
              /{pembayaran}
            </p>
          </div>
          <ButtonPrimary
            className="btn text-base font-normal mt-2"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Pengajuan Sewa
          </ButtonPrimary>
        </div>
      </div>

      {/* Dialog Modal ukuran mobile */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <div className="flex items-end py-4">
            <p className="text-neutral-800 text-3xl font-bold">
              {rupiahFormatter(harga)}
            </p>
            <p className="text-neutral-800 text-xl font-medium">
              /{pembayaran}
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-1">
              <InputField
                type="date"
                label="Mulai Kost"
                name="start_date"
                classNameLabel="md:text-base"
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{start_date}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <SelectPembayaran
                label="Jangka Pembayaran"
                classNameLabel="md:text-base"
                className="text-lg"
                name="payment_term"
                value={pembayaran}
                onChangeCapture={(e) => setPembayaran(e.target.value)}
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{payment_term}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <SelectLantai
                label="Lantai"
                classNameLabel="md:text-base"
                name="floor"
                value={lantai}
                onChangeCapture={(e) => setLantai(e.target.value)}
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{floor}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <SelectNoKamar
                label="Nomor Kamar"
                classNameLabel="md:text-base"
                name="number_room"
                floor={lantai}
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{floor}</p>
              ) : null}
            </div>
            </div>
          </form>
          <div className="modal-action ">
            <form method="dialog" className="w-full">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <IoClose size={32} />
              </button>
              {isLogin ? (
                <ButtonPrimary
                  type="submit"
                  className="text-lg font-normal mt-2"
                  onClick={() => formik.handleSubmit()}
                >
                  {isLoading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    "Ajukan Sewa"
                  )}
                </ButtonPrimary>
              ) : (
                <>
                  <p className="text-error-600 text-sm mt-2">
                    Silahkan login terlebih dahulu untuk melanjutkan
                  </p>
                  <ButtonPrimary className="btn-disabled text-lg font-medium mt-2">
                    Ajukan Sewa
                  </ButtonPrimary>
                </>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default InputPengajuan;
