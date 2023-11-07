/* eslint-disable react/display-name */
import { forwardRef } from "react";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import Cookies from "js-cookie";
import ButtonPrimary from "../../../../Elements/Button";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../../lib/axios";
import { Skeleton } from "@chakra-ui/react";
import TableRiwayatPenghuni from "./TableRiwayatPenghuni";

const Detailkamar = forwardRef((props, ref) => {
  const token = Cookies.get("token");
  const id = ref.current;
  const idParams = parseInt(id);

  const { data, isLoading } = useQuery({
    queryKey: ["detailKamar", id],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/room/detail?id=${id}`, { headers });
      return res;
    },
    onSuccess: () => {
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const facilities = () => {
    return data?.data?.facilities.map((facility) => {
      const facilityArray = [];
      if (facility.ac === 1) {
        facilityArray.push("AC");
      }
      if (facility.kasur === 1) {
        facilityArray.push("Kasur");
      }
      if (facility.lemari === 1) {
        facilityArray.push("Lemari");
      }
      if (facility.meja === 1) {
        facilityArray.push("Meja");
      }
      if (facility.wifi === 1) {
        facilityArray.push("Wifi");
      }
      if (facility.km_luar === 1) {
        facilityArray.push("Kamar Mandi Luar");
      }
      if (facility.km_dalam === 1) {
        facilityArray.push("Kamar Mandi Dalam");
      }
      return facilityArray.join(", ");
    });
  };

  const rupiahFormatter = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <AdminLayout title="Detail Kamar" routeParams={idParams}>
      <div className="flex flex-col w-full h-full p-8 gap-4 bg-neutral-25 rounded-2xl border border-neutral-100 shadow-lg">
        <div className="flex flex-col gap-4 w-full lg:w-2/5">
          <h1 className="text-neutral-800 mb-2 text-lg md:text-xl font-semibold">
            Data Tipe Kamar
          </h1>
          {isLoading ? (
            <Skeleton height="25px" w={"100px"} />
          ) : data?.data?.rooms[0].status_room === "Terisi" ? (
            <div className="badge bg-success-100 -my-1 h-full py-1 px-2 text-success-700">
              {data?.data?.rooms[0].status_room}
            </div>
          ) : (
            <div className="badge bg-secondary-100 -my-1 h-full py-1 px-2 text-secondary-700">
              {data?.data?.rooms[0].status_room}
            </div>
          )}
          <div className="flex w-full font-medium text-sm md:text-base">
            {isLoading ? (
              <Skeleton height="25px" w={"300px"} />
            ) : (
              <>
                <p className="w-1/3 lg:w-40">Nama Kamar</p>
                <p className="w-2/3">
                  : {data?.data?.rooms[0].class_room?.room_name}
                </p>
              </>
            )}
          </div>
          <div className="flex w-full font-medium text-sm md:text-base">
            {isLoading ? (
              <Skeleton height="25px" w={"300px"} />
            ) : (
              <>
                <p className="w-1/3 lg:w-40">Fasilitas</p>
                <p className="w-2/3">: {facilities()}</p>
              </>
            )}
          </div>
          <div className="flex w-full font-medium text-sm md:text-base">
            {isLoading ? (
              <Skeleton height="25px" w={"300px"} />
            ) : (
              <>
                <p className="w-1/3 lg:w-40">Nomor</p>
                <p className="w-2/3">: {data?.data?.rooms[0].number_room}</p>
              </>
            )}
          </div>
          <div className="flex w-full font-medium text-sm md:text-base">
            {isLoading ? (
              <Skeleton height="25px" w={"300px"} />
            ) : (
              <>
                <p className="w-1/3 lg:w-40">Lantai</p>
                <p className="w-2/3">: {data?.data?.rooms[0].number_floor}</p>
              </>
            )}
          </div>
          <div className="flex w-full font-medium text-sm md:text-base">
            {isLoading ? (
              <Skeleton height="25px" w={"300px"} />
            ) : (
              <>
                <p className="w-1/3 lg:w-40">Ukuran</p>
                <p className="w-2/3">: {data?.data?.rooms[0].room_size}</p>
              </>
            )}
          </div>
          <div className="flex w-full font-medium text-sm md:text-base">
            {isLoading ? (
              <Skeleton height="25px" w={"300px"} />
            ) : (
              <>
                <p className="w-1/3 lg:w-40">Harga</p>
                <p className="w-2/3">
                  : {rupiahFormatter(data?.data?.rooms[0].room_price)}
                </p>
              </>
            )}
          </div>

          <div className="flex gap-4 my-8">
            <ButtonPrimary
              className="btn btn-sm md:btn-md w-1/2 h-full font-medium text-xs md:text-sm bg-error-600 hover:bg-error-700 active:bg-error-800"
              onClick={() =>
                Swal.fire({
                  text: "Apakah Anda Yakin Ingin Menghapus Data Kamar?",
                  icon: "warning",
                  showCancelButton: true,
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Hapus",
                  cancelButtonText: "Batal",
                }).then((result) => {
                  if (result.isConfirmed) {
                    alert("Data Kamar Berhasil Dihapus");
                  }
                })
              }
              // onClick={() => mutate({id:idParams})}
            >
              Hapus Data Kamar
            </ButtonPrimary>
            <ButtonPrimary
              className="btn btn-sm md:btn-md w-1/2 h-full font-medium text-xs md:text-sm"
              // onClick={() =>
              //   navigate(
              //     `/admin/dashboard/dataTipeKamar/detail/edit/${idParams}`
              //   )
              // }
            >
              Edit Data Kamar
            </ButtonPrimary>
          </div>
        </div>
        <TableRiwayatPenghuni roomId={idParams} />
      </div>
    </AdminLayout>
  );
});

export default Detailkamar;
