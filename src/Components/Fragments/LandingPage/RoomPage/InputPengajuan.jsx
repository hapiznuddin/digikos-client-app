import Cookies from "js-cookie";
import ButtonPrimary from "../../../Elements/Button";
import InputField from "../../../Elements/Input";
import SelectLantai from "../../../Elements/Select/SelectLantai";
import SelectNoKamar from "../../../Elements/Select/SelectNoKamar";
import SelectPembayaran from "../../../Elements/Select/SelectPembayaran";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import PropTypes from 'prop-types';

const InputPengajuan = ({hargaKamar}) => {
  InputPengajuan.propTypes = {
    hargaKamar: PropTypes.number,
  }
  const token = Cookies.get("token");
  const [isLogin, setIsLogin] = useState(false);
  const [pembayaran, setPembayaran] = useState('bulan');
  const [harga, setHarga] = useState(hargaKamar);
  const [lantai, setLantai] = useState('');

  const rupiahFormatter = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  useEffect(() => {
    if (pembayaran === 'bulan') {
      setHarga(hargaKamar);
    } else if (pembayaran === '6 bulan') {
      setHarga(hargaKamar * 6);
    } else if (pembayaran === 'tahun') {
      setHarga(hargaKamar * 12);
    }
  }, [ pembayaran, hargaKamar ]);

  const isLoggedIn = () => {
    if (token != null) {
      alert("menuju halaman selanjutnya");
      setIsLogin(true);
    } else {
      Swal.fire({
        title: "Anda belum login",
        text: "Silahkan login terlebih dahulu",
        icon: "error",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      setIsLogin(false);
    }
  };

  return (
    <>
      <div className="hidden lg:sticky lg:top-28 lg:flex lg:flex-col gap-6 w-2/5 h-full bg-neutral-25 shadow-lg rounded-3xl border border-neutral-100 p-4">
        <div className="flex items-end">
          <p className="text-neutral-800 text-3xl font-bold">{rupiahFormatter(harga)}</p>
          <p className="text-neutral-800 text-xl font-medium">/{pembayaran}</p>
        </div>
        <form>
          <div className="flex flex-col w-full gap-4">
            <InputField
              type="date"
              label="Mulai Kost"
              classNameLabel="md:text-base"
            />
            <SelectPembayaran
              label="Jangka Pembayaran"
              classNameLabel="md:text-base"
              className = "text-lg"
              value={pembayaran}
              onChange={(e) => setPembayaran(e.target.value)}
            />
            <SelectLantai label="Lantai" classNameLabel="md:text-base" onChange={(e) => setLantai(e.target.value)} value={lantai}/>
            <SelectNoKamar label="Nomor Kamar" classNameLabel="md:text-base" floor={lantai}/>
          </div>
        </form>
        <ButtonPrimary
          className="text-lg font-medium mt-2"
          onClick={
            isLogin
              ? () =>
                  alert("menuju halaman selanjutnya").then(
                    () => (window.location.href = "/")
                  )
              : () => isLoggedIn()
          }
        >
          Ajukan Sewa
        </ButtonPrimary>
      </div>
      <div className="btm-nav h-[140px] lg:hidden bg-neutral-25 shadow-[0_-3px_4px_0_rgba(0,0,0,0.05)]">
        <div className="flex flex-col w-full gap-2 justify-end mb-12 px-12">
          <div className="flex justify-center w-full">
            <p className="text-neutral-800 text-2xl font-bold">{rupiahFormatter(harga)}</p>
            <p className="text-neutral-800 text-lg font-medium">/{pembayaran}</p>
          </div>
          <ButtonPrimary className="btn text-base font-normal mt-2"
          onClick={()=>document.getElementById('my_modal_4').showModal()}
          >
            Pengajuan Sewa
          </ButtonPrimary>
        </div>
      </div>

      <dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-2xl">
  <div className="flex items-end py-4">
          <p className="text-neutral-800 text-3xl font-bold">{rupiahFormatter(harga)}</p>
          <p className="text-neutral-800 text-xl font-medium">/{pembayaran}</p>
        </div>
<form>
      <div className="flex flex-col w-full gap-4">
            <InputField
              type="date"
              label="Mulai Kost"
              classNameLabel="md:text-base"
            />
            <SelectPembayaran
              label="Jangka Pembayaran"
              classNameLabel="md:text-base"
              value={pembayaran}
              onChange={(e) => setPembayaran(e.target.value)}
            />
            <SelectLantai label="Lantai" classNameLabel="md:text-base" onChange={(e) => setLantai(e.target.value)} value={lantai}/>
            <SelectNoKamar label="Nomor Kamar" classNameLabel="md:text-base" floor={lantai}/>
          </div>
</form>
    <div className="modal-action ">
      <form method="dialog" className="w-full">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        <IoClose size={32}/>
      </button>
      <ButtonPrimary
          className="text-lg font-medium mt-2"
          onClick={
            isLogin
              ? () =>
                  alert("menuju halaman selanjutnya").then(
                    () => (window.location.href = "/")
                  )
              : () => isLoggedIn()
          }
        >
          Ajukan Sewa
        </ButtonPrimary>
      </form>
    </div>
  </div>
</dialog>
    </>
  );
};

export default InputPengajuan;
