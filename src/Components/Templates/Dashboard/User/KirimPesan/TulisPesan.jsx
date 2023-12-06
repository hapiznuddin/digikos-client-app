/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import ButtonPrimary from "../../../../Elements/Button";
import { forwardRef, useEffect, useState } from "react";
import Input from "../../../../Elements/Input/Input";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as yup from "yup";
import { GoIssueClosed } from "react-icons/go";
import PropTypes from "prop-types";
import { useWriteMessage } from "../../../../../services/dashboard/user/kirimPesan/useWriteMessage";

const TulisPesan = forwardRef(({ refetch }, ref) => {
  TulisPesan.propTypes = {
    refetch: PropTypes.func,
  };
  const idRef = ref.current;
  const token = Cookies.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      message: "",
      description: "",
    },
    onSubmit: async () => {
      mutate({
        user_id: idRef,
        message: formik.values.message,
        description: formik.values.description,
      });
    },
    validationSchema: yup.object({
      message: yup.string().required("Pesan harus diisi"),
      description: yup.string().required("Keterangan harus diisi"),
    }),
    onReset: () => {
      formik.setFieldValue("message", "");
      formik.setFieldValue("description", "");
    },
  });

  const { message, description } = formik.errors;

  const { mutate, isLoading } = useWriteMessage({
    token,
    onSuccess: () => {
      refetch();
      setIsSuccess(true);
    },
    onError: (error) => {
      console.log(error);
      setIsError(true);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
    }
    if (isError) {
      formik.resetForm();
    }
  }, [isSuccess, isError]);

  return (
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <AiOutlineClose size={20} />
        </button>
      </form>
      <div className="toast toast-top toast-center">
        {isSuccess ? (
          <div className="alert alert-success gap-2">
            <GoIssueClosed size={20} />
            <span>Pesan berhasil dibuat</span>
            <button onClick={() => setIsSuccess(false)}>
              <AiOutlineClose size={20} />
            </button>
          </div>
        ) : null}
        {isError ? (
          <div className="alert alert-error gap-2">
            <AiOutlineCloseCircle size={20} />
            <span>Pesan gagal dibuat</span>
            <button onClick={() => setIsError(false)}>
              <AiOutlineClose size={20} />
            </button>
          </div>
        ) : null}
      </div>
      <h1 className="text-neutral-800 text-base md:text-xl font-semibold mb-4">
        Tulis Pesan
      </h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium text-base md:text-lg">Keluhan</p>
          <Input
            type="text"
            name="message"
            placeholder="Masukkan keluhan"
            onChange={handleForm}
            value={formik.values.message}
          />
          {message ? <p className="text-error-500 text-sm">{message}</p> : null}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium text-base md:text-lg">Keterangan</p>
          <textarea
            className="textarea textarea-bordered rounded-full w-full hover:border-primary-500 focus:outline-primary-500 text-base"
            placeholder="Masukkan keterangan"
            name="description"
            onChange={handleForm}
            value={formik.values.description}
          />
          {description ? (
            <p className="text-error-500 text-sm">{description}</p>
          ) : null}
        </div>
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
            type={"button"}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              "Simpan"
            )}
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
});

export default TulisPesan;
