/* eslint-disable react/display-name */
import { forwardRef, useState } from "react"
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import { BsFileEarmarkX } from "react-icons/bs";
import { Skeleton } from "@chakra-ui/react";
import { useGetDetailPengajuanSewa } from "../../../../../services/dashboard/admin/pengajuanSewa/useDetailPengajuanSewa";
import Cookies from "js-cookie";
import { useGetKTP } from "../../../../../services/landingPage/rentPage/useGetKTP";
import { useGetKK } from "../../../../../services/landingPage/rentPage/useGetKK";
import TableHistoryPayment from "./TableHistoryPayment";

const DetailPenghuni = forwardRef((props, ref) => {
  const token = Cookies.get("token");
  const idRef = ref.current;
  const idRefNumber = parseInt(idRef);
  const [id, setId] = useState(null);
  // const [rentId, setRentId] = useState(null);
  const [ktpPicture, setKtpPicture] = useState(false);
  const [kkPicture, setKkPicture] = useState(false);

  const { data, isLoading } = useGetDetailPengajuanSewa({
    token,
    idRef,
    onSuccess: (data) => {
      setId(data?.data.occupant_id);
      // setRentId(data?.data.id);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const {
    data: getKtp,
    refetch: refetchKtp,
    isLoading: isLoadingKtp,
  } = useGetKTP({
    token,
    id,
    onSuccess: () => {
      setKtpPicture(true);
    },
    onError: (data) => {
      refetchKtp();
      refetchKK();
      setKkPicture(false);
      setKtpPicture(false);
      console.log(data);
    },
  });

  const {
    data: getKK,
    refetch: refetchKK,
    isLoading: isLoadingKK,
  } = useGetKK({
    token,
    id,
    onSuccess: () => {
      setKkPicture(true);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const imgKTP = `${import.meta.env.VITE_DIGIKOS_URL}${getKtp?.data.path}`;
  const imgKK = `${import.meta.env.VITE_DIGIKOS_URL}${getKK?.data.path}`;

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

  return (
    <AdminLayout routeParams={idRefNumber} title="Detail Penghuni">
      <div className="flex flex-col w-full h-full p-8 gap-8 bg-neutral-25 rounded-2xl border border-neutral-100 shadow-lg">
      <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 w-full lg:w-2/3 ">
            <h1 className="text-neutral-800 mb-2 text-lg md:text-xl font-semibold">
              Data Penghuni
            </h1>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Nama</p>
                  <p className="w-2/3">: {data?.data?.occupant.name}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Nomor Hp</p>
                  <p className="w-2/3">: {data?.data?.occupant.phone}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base ">
              {isLoading ? (
                <Skeleton height="25px" w={"400px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40 ">Alamat</p>
                  <p className="w-2/3">: {data?.data?.occupant.address}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Jenis Kelamin</p>
                  <p className="w-2/3">: {data?.data?.occupant.gender}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Pekerjaan</p>
                  <p className="w-2/3">: {data?.data?.occupant.occupation}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Kamar</p>
                  <p className="w-2/3">: Lantai {data?.data?.room?.floor} No {data?.data?.room?.number_room}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Jumlah Penyewa</p>
                  <p className="w-2/3">
                    :
                    {data?.data?.additional_occupant === null
                      ? " 1 Orang"
                      : " 2 orang"}
                  </p>
                </>
              )}
            </div>
            {data?.data?.additional_occupant ? (
              <div className="flex w-full font-medium text-sm md:text-base">
                {isLoading ? (
                  <Skeleton height="25px" w={"300px"} />
                ) : (
                  <>
                    <p className="w-1/3 lg:w-40">Tambahan Penyewa</p>
                    <p className="w-2/3">: {data?.data?.additional_occupant}</p>
                  </>
                )}
              </div>
            ) : null}
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Tanggal Masuk</p>
                  <p className="w-2/3">
                    : {formatDate(data?.data?.start_date)}
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
              <div className="w-full md:w-1/2 h-full bg-neutral-300 rounded-xl">
                {isLoadingKtp ? (
                  <Skeleton
                    className="w-full h-40"
                    style={{ borderRadius: "16px" }}
                  />
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
                  <Skeleton
                    className="w-full h-40"
                    style={{ borderRadius: "16px" }}
                  />
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
        <TableHistoryPayment idOccupant={id}/>
      </div>
    </AdminLayout>
  )
})

export default DetailPenghuni