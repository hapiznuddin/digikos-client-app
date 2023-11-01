/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import ButtonPrimary from "../../../../Elements/Button";
import Cookies from "js-cookie";
import { useApproveCheckIn, useApprovePengajuanSewa, useGetDetailPengajuanSewa } from "../../../../../services/dashboard/admin/pengajuanSewa/useDetailPengajuanSewa";
import { Skeleton } from "@chakra-ui/react";
import { useGetKTP } from "../../../../../services/landingPage/rentPage/useGetKTP";
import { BsFileEarmarkX } from "react-icons/bs";
import { useGetKK } from "../../../../../services/landingPage/rentPage/useGetKK";
import Swal from "sweetalert2";

const DetailPengajuanSewa = forwardRef((props, ref) => {
  const token = Cookies.get("token");
  const idRef = ref.current;
  const idRefNumber = parseInt(idRef);
  const [id, setId] = useState(null);
  const [rentId, setRentId] = useState(null);
  const [ktpPicture, setKtpPicture] = useState(false);
  const [kkPicture, setKkPicture] = useState(false);

  const { data, isLoading, refetch: refetchDetail } = useGetDetailPengajuanSewa({
    token,
    idRef,
    onSuccess: (data) => {
      setId(data?.data.occupant_id);
      setRentId(data?.data.id);
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
    if (
      typeof inputDate === "string" &&
      inputDate.match(/^\d{4}-\d{2}-\d{2}$/)
    ) {
      const dateParts = inputDate.split("-");
      if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        return `${day}-${month}-${year}`;
      }
    }
    return inputDate; // Kembalikan format asli jika tidak valid atau tidak string
  }

  const rupiahFormater = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const { mutate: approveAdmin } = useApprovePengajuanSewa({
    token,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Pengajuan Sewa Berhasil Disetujui",
        timer: 1500,
      })
      refetchDetail();
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const { mutate: approveCheckIn } = useApproveCheckIn({
    token,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Check in Berhasil Dikonfirmasi",
        timer: 1500,
      })
      refetchDetail();
    },
    onError: (data) => {
      console.log(data);
    },
  });

  return (
    <AdminLayout pengajuanSewaId={idRefNumber}>
      <div className="flex flex-col w-full h-full p-8 bg-neutral-25 rounded-2xl border border-neutral-100 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 w-full lg:w-2/3 ">
            <h1 className="text-neutral-800 mb-4 text-xl lg:text-2xl font-semibold">
              Data Penyewa
            </h1>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Nama Penyewa</p>
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
                  <p className="w-1/3 lg:w-40">Tanggal Sewa</p>
                  <p className="w-2/3">
                    : {formatDate(data?.data?.start_date)}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full h-full lg:w-2/3 ">
            <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold">
              Dokumen Penyewa
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
        <div className="flex flex-col w-full mt-12 gap-8">
          <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold">
            Data Kamar
          </h1>
          <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-primary-50 text-base text-neutral-800">
                <tr>
                  <th className="font-medium">Nama Kamar</th>
                  <th className="font-medium">Nomor Kamar</th>
                  <th className="font-medium">Lantai</th>
                  <th className="font-medium">Ukuran</th>
                  <th className="font-medium">Harga Kamar</th>
                  <th className="font-medium">Deposit</th>
                  <th className="font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr className="text-center">
                    <td colSpan={9}>
                      <span className="loading loading-spinner loading-lg text-primary-500" />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>{data?.data?.classroom?.name}</td>
                    <td>{data?.data?.room?.number_room}</td>
                    <td>{data?.data?.room?.floor}</td>
                    <td>{data?.data?.classroom?.size}</td>
                    <td>{rupiahFormater(data?.data?.total_price)}</td>
                    <td>{rupiahFormater(data?.data?.classroom?.deposit)}</td>
                    <td>
                      {data?.data.status_id === 5 ? (<div className="badge h-full py-1 px-3 bg-success-200 text-success-800">
                        {data?.data?.status}
                      </div>) : (<div className="badge h-full py-1 px-3 bg-secondary-100 text-secondary-800">
                        {data?.data?.status}
                      </div>)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row w-full md:gap-2 gap-4 mt-8">
            {data?.data.status_id === 2 || data?.data.status_id === 3 ? (<ButtonPrimary className="w-full md:w-1/2 lg:w-52 text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300">
              Tolak
            </ButtonPrimary>): null}

            {data?.data.status_id === 4 ? (<ButtonPrimary className="font-medium w-full md:w-1/2 text-lg lg:w-52"
            onClick={() => approveCheckIn({rent_id: rentId})}
            >
              Check-In
            </ButtonPrimary>) : (
            data?.data.status_id === 4 || data?.data.status_id === 2 || data?.data.status_id === 3 ? (<ButtonPrimary className="font-medium w-full md:w-1/2 text-lg lg:w-52"
            onClick={() => approveAdmin({rent_id: rentId})}
            >
              Setujui
            </ButtonPrimary>): null)}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
});

export default DetailPengajuanSewa;
