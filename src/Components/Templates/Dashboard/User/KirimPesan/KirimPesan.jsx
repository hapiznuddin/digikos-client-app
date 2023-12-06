/* eslint-disable react/display-name */
import { forwardRef, useRef, useState } from "react";
import UserLayout from "../../../../Layouts/DashboardLayout/DashboardUser/Layout";
import Cookies from "js-cookie";
import ButtonPrimary from "../../../../Elements/Button";
import { useGetDetailMessage } from "../../../../../services/dashboard/admin/pesanMasuk/useGetDetailMessage";
import { AiOutlineClose } from "react-icons/ai";
import useGetSendMessage from "../../../../../services/dashboard/user/kirimPesan/useGetSendMessage";
import TulisPesan from "./TulisPesan";

const KirimPesan = forwardRef((props, ref) => {
  const idRef = ref.current;
  const refId = useRef(idRef);
  const token = Cookies.get("token");
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, refetch } = useGetSendMessage({
    token,
    idRef
  });

  const { data: getMessage, isLoading: isLoadingMessage } = useGetDetailMessage(
    {
      token,
      id: selectedId,
    }
  );

  return (
    <UserLayout title="Kirim Pesan" idParams={idRef}>
      <div className="flex flex-col gap-8 bg-neutral-25 px-4 py-8 rounded-xl shadow border border-neutral-100">
        <div className="flex flex-col md:flex-row gap-2 w-full justify-between md:items-center">
          <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">
            Kirim Pesan
          </h1>
          <ButtonPrimary className="font-medium text-base w-48"
            onClick={() =>
              document.getElementById("my_modal_2").showModal()
            }
          >
            Tulis Pesan
          </ButtonPrimary>
          <dialog id="my_modal_2" className="modal">
            <TulisPesan ref={refId} refetch={refetch}/>
          </dialog>
        </div>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr className="font-medium">
                <th className="font-medium">No</th>
                <th className="font-medium">Nama</th>
                <th className="font-medium">Nama Kamar</th>
                <th className="font-medium">Kamar</th>
                <th className="font-medium">Tanggal</th>
                <th className="font-medium">Keluhan</th>
                <th className="font-medium">Status</th>
                <th className="font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={9}>
                    <span className="loading loading-spinner loading-lg text-primary-500" />
                  </td>
                </tr>
              ) : data?.data.length === 0 ? (
                <tr className="text-center font-medium">
                  <td colSpan={9}>Tidak Ada Tagihan</td>
                </tr>
              ) : (
                data?.data.map((message, index) => {
                  return (
                    <tr key={index}>
                      <th className="font-medium">{index + 1}</th>
                      <td>{message.name}</td>
                      <td>{message.room_name}</td>
                      <td>
                        Lantai {message.floor} no {message.number}
                      </td>
                      <td>{message.created_at}</td>
                      <td>{message.message}</td>
                      <td>
                        <div
                          className={`badge h-full py-1 px-3 ${
                            message.status === "Diterima"
                              ? "bg-info-200 text-info-800"
                              : message.status === "Terkirim"
                              ? "bg-primary-100 text-primary-800"
                              : message.status === "Dikerjakan"
                              ? "bg-secondary-200 text-secondary-800"
                              : "bg-success-200 text-success-800"
                          }`}
                        >
                          {message.status}
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-ghost text-primary-500 rounded-full font-medium text-base text-center hover:bg-primary-100"
                          onClick={() =>
                            document.getElementById("my_modal_1").showModal()
                          }
                          onClickCapture={() => {
                            setSelectedId(message.id);
                          }}
                        >
                          Detail
                        </button>
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box w-11/12 max-w-2xl flex flex-col gap-4">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                <AiOutlineClose size={20} />
                              </button>
                            </form>
                            <div className="flex flex-col gap-2 w-full">
                              <p className="font-medium text-base md:text-lg">
                                Keluhan
                              </p>
                              {isLoadingMessage ? (
                                <div className="skeleton h-8 w-full"></div>
                              ) : (
                                <div className="flex w-full h-full rounded-full px-5 py-1 border border-neutral-300">
                                  <p className="text-sm md:text-base">
                                    {getMessage?.message}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 w-full mt-2">
                              <p className="font-medium text-base md:text-lg">
                                Keterangan
                              </p>
                              {isLoadingMessage ? (
                                <div className="skeleton h-8 w-full"></div>
                              ) : (
                                <div className="flex w-full h-full rounded-full px-5 py-1 border border-neutral-300">
                                  <p className="text-sm md:text-base">
                                    {getMessage?.description}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </dialog>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
});

export default KirimPesan;
