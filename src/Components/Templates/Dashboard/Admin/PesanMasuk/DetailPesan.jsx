import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import ButtonPrimary from "../../../../Elements/Button";
import Cookies from "js-cookie";
import { GoIssueClosed } from "react-icons/go";
import { useGetDetailMessage } from "../../../../../services/dashboard/admin/pesanMasuk/useGetDetailMessage";
import { useApproveMessage } from "../../../../../services/dashboard/admin/pesanMasuk/useApproveMessage";

const DetailPesan = ({ id, refetching }) => {
  DetailPesan.propTypes = {
    id: PropTypes.number,
    refetching: PropTypes.func,
  };
  const token = Cookies.get("token");

  const [statuses, setStatuses] = useState({
    Diterima: false,
    Dikerjakan: false,
    Selesai: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleFormCheckbox = (event) => {
    const { value, checked } = event.target;
    // Jika sedang memeriksa (checked) satu status, matikan status lainnya
    if (checked) {
      const updatedStatuses = Object.keys(statuses).reduce((acc, status) => {
        return {
          ...acc,
          [status]: status === value, // Setel status saat ini sesuai dengan value checkbox saat ini
        };
      }, {});
      setStatuses(updatedStatuses);
    } else {
      // Jika membatalkan centang, biarkan status saat ini
      setStatuses({
        ...statuses,
        [value]: checked,
      });
    }
  };

  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      set_status: "",
    },
    onSubmit: async () => {
      mutate({
        id: id,
        set_status: formik.values.set_status
      })
    },
  });

  const { mutate, isLoading: isLoadingMutate } = useApproveMessage({
    token,
    onSuccess: () => {
      refetching();
      refetch();
      setIsSuccess(true);
    },
    onError: () => {
      setIsError(true);
    },
  })

  const { data, isLoading, refetch } = useGetDetailMessage({
    id,
    token,
    onSuccess: (data) => {
      setStatuses({
        Diterima: data?.status === "Diterima" ? true : false,
        Dikerjakan: data?.status === "Dikerjakan" ? true : false,
        Selesai: data?.status === "Selesai" ? true : false,
      });
    },
    onError: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <AiOutlineClose size={20} />
        </button>
      </form>
      <div className="toast toast-top toast-center">
        {isSuccess ? (<div className="alert alert-success gap-2">
          <GoIssueClosed size={20} />
          <span>Status Berhasil Diganti</span>
          <button onClick={() => setIsSuccess(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>):null}
        {isError ? (<div className="alert alert-error gap-2">
          <AiOutlineCloseCircle size={20} />
          <span>Status Gagal Diganti</span>
          <button onClick={() => setIsError(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>):null}
      </div>
      <h1 className="text-neutral-800 text-base md:text-xl font-semibold mb-4">
        Detail Pesan
      </h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium text-base md:text-lg">Keluhan</p>
          {isLoading ? (
            <div className="skeleton h-8 w-full"></div>
          ) : (
            <div className="flex w-full h-full rounded-full px-5 py-1 border border-neutral-300">
              <p className="text-sm md:text-base">{data?.message}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium text-base md:text-lg">Keterangan</p>
          {isLoading ? (
            <div className="skeleton h-8 w-full"></div>
          ) : (
            <div className="flex w-full h-full rounded-full px-5 py-1 border border-neutral-300">
              <p className="text-sm md:text-base">{data?.description}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium text-base md:text-lg">Status</p>
          <div className="join join-vertical">
            {isLoading ? (
              <div className="flex flex-col gap-4 w-40">
                <div className="skeleton h-5 w-full"></div>
                <div className="skeleton h-5 w-full"></div>
                <div className="skeleton h-5 w-full"></div>
              </div>
            ) : (
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="set_status"
                    checked={statuses.Diterima}
                    onChangeCapture={handleFormCheckbox}
                    value={"Diterima"}
                    onChange={handleForm}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text text-base">Diterima</span>
                </label>
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="set_status"
                    checked={statuses.Dikerjakan}
                    onChangeCapture={handleFormCheckbox}
                    value={"Dikerjakan"}
                    onChange={handleForm}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text text-base">Dikerjakan</span>
                </label>
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="set_status"
                    checked={statuses.Selesai}
                    onChangeCapture={handleFormCheckbox}
                    value={"Selesai"}
                    onChange={handleForm}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text text-base">Selesai</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="modal-action">
        <form method="dialog" className="w-full ">
          <ButtonPrimary className="w-full text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300">
            Batal
          </ButtonPrimary>
        </form>
        <form method="dialog" className="flex w-full">
          <ButtonPrimary
            className="w-full text-lg font-medium"
            type={"button"}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {isLoadingMutate ? (
                <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  "Simpan"
                )}
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default DetailPesan;
