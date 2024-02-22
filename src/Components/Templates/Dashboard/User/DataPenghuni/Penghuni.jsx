/* eslint-disable react/display-name */
import { forwardRef, useState } from "react"
import UserLayout from "../../../../Layouts/DashboardLayout/DashboardUser/Layout"
import Cookies from "js-cookie";
import { useGetKTP } from "../../../../../services/landingPage/rentPage/useGetKTP";
import { useGetKK } from "../../../../../services/landingPage/rentPage/useGetKK";
import { BsFileEarmarkX } from "react-icons/bs";
import { useGetOccupantByRent } from "../../../../../services/dashboard/user/penghuni/useGetOccupantByRent";
import { useRef } from "react";
import TableHistoryPayOccupant from "./TableHistoryPayOccupant";

const Penghuni = forwardRef((props, ref) => {
  const token = Cookies.get("token");
  const idRef = ref.current;
  const refId = useRef(idRef);
  const [id] = useState('');
  const [ktpPicture, setKtpPicture] = useState(false);
  const [kkPicture, setKkPicture] = useState(false);

  const { data: getOccupant, isLoading: isLoadingOccupant} = useGetOccupantByRent({
    token,
    idRef,
  })

  const {
    data: getKtp,
    isLoading: isLoadingKtp,
  } = useGetKTP({
    token,
    id,
    userId: idRef,
    onSuccess: () => {
      setKtpPicture(true);
    },
    onError: () => {
      setKkPicture(false);
      setKtpPicture(false);
    },
  });

  const {
    data: getKK,
    isLoading: isLoadingKK,
  } = useGetKK({
    token,
    id,
    userId: idRef,
    onSuccess: () => {
      setKkPicture(true);
    },
  });

  const imgKTP = `${import.meta.env.VITE_DIGIKOS_URL}${getKtp?.data.path}`;
  const imgKK = `${import.meta.env.VITE_DIGIKOS_URL}${getKK?.data.path}`;

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  }

  return (
    <UserLayout title="Detail Penghuni" idParams={idRef}>
      <div className="flex flex-col w-full h-full p-8 gap-8 bg-neutral-25 rounded-2xl border border-neutral-100 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 w-full lg:w-2/3 ">
            <div className="flex gap-4 items-center">
            <h1 className="text-neutral-800 mb-2 text-lg md:text-xl font-semibold">
              Data Penghuni
            </h1>
            <div className="badge h-full px-3 bg-success-200 text-success-800">Sewa</div>
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Nama</p>
                  <p className="w-2/3">: {getOccupant.occupant?.name}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Nomor Hp</p>
                  <p className="w-2/3">: {getOccupant.occupant?.phone}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base ">
              {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40 ">Alamat</p>
                  <p className="w-2/3">: {getOccupant.occupant?.address}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
            {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Jenis Kelamin</p>
                  <p className="w-2/3">: {getOccupant.occupant?.gender}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
            {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Pekerjaan</p>
                  <p className="w-2/3">: {getOccupant.occupant?.occupation}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
            {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Kamar</p>
                  <p className="w-2/3">
                    : Lantai {getOccupant.room?.floor} No 
                    {getOccupant.room?.number_room}
                  </p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Jumlah Penyewa</p>
                  <p className="w-2/3">
                    :
                    {getOccupant.additional_occupant === null
                      ? " 1 Orang"
                      : " 2 orang"}
                  </p>
                </>
              )}
            </div>
            {getOccupant?.additional_occupant ? (
              <div className="flex w-full font-medium text-sm md:text-base">
                {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                  <>
                    <p className="w-1/3 lg:w-40">Tambahan Penyewa</p>
                    <p className="w-2/3">: {getOccupant.additional_occupant}</p>
                  </>
                )}
              </div>
            ) : null}
            <div className="flex w-full font-medium text-sm md:text-base">
            {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Jangka Pembayaran</p>
                  <p className="w-2/3">
                    : {getOccupant.payment_term === 'bulan' ? 'Perbulan' : getOccupant.payment_term === '6 bulan' ? 'Per 6 Bulan' : 'Pertahun'}
                  </p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
            {isLoadingOccupant ? (
                <div className="skeleton h-4 w-96"></div>
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Tanggal Masuk</p>
                  <p className="w-2/3">
                    : {formatDate(getOccupant.start_date)}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full h-full lg:w-2/3 ">
            <h1 className="text-neutral-800 text-lg md:text-xl  font-semibold">
              Dokumen Penghuni
            </h1>
            <div className="flex flex-col md:flex-row w-full gap-4 p-8 rounded-2xl border border-neutral-200">
              <div className="w-full md:w-1/2 h-full bg-neutral-200 rounded-xl">
                {isLoadingKtp ? (
                  <div className="skeleton w-full h-40"></div>
                ) : ktpPicture ? (
                  <a href={imgKTP} target="_blank" rel="noreferrer">
                    <img
                      src={imgKTP}
                      className="w-full h-full md:h-40 rounded-xl"
                    />
                  </a>
                ) : (
                  <div className="flex flex-col gap-2 h-40 w-full items-center justify-center">
                    <BsFileEarmarkX className="w-10 h-10" />
                    <p>KTP tidak ada</p>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 h-full bg-neutral-200 rounded-xl">
                {isLoadingKK ? (
                  <div className="skeleton w-full h-40"></div>
                ) : kkPicture ? (
                  <a href={imgKK} target="_blank" rel="noreferrer">
                    <img
                      src={imgKK}
                      className="w-full h-full md:h-40 rounded-xl"
                    />
                  </a>
                ) : (
                  <div className="flex flex-col gap-2 h-40 w-full items-center justify-center">
                    <BsFileEarmarkX className="w-10 h-10" />
                    <p>KK tidak ada</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <TableHistoryPayOccupant ref={refId} />
      </div>
    </UserLayout>
  );
})

export default Penghuni