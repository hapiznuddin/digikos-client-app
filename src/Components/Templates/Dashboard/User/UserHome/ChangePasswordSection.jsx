/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import ButtonPrimary from "../../../../Elements/Button"
import InputField from "../../../../Elements/Input"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useEditPassword } from "../../../../../services/auth/useEditPassword";
import { GoIssueClosed } from "react-icons/go";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";

const ChangePasswordSection = () => {
  const token = Cookies.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async () => {
      mutate({
        password: formik.values.password
      })
    },
    validate: (values) => {
      const errors = {};
  
      if (!values.password) {
        errors.password = "Password harus diisi";
      } else if (values.password.length < 8) {
        errors.password = "Password minimal 8 karakter";
      }
  
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Konfirmasi password tidak sesuai";
      }
      return errors;
    },
    onReset: () => {
      formik.setFieldValue("password", "");
      formik.setFieldValue("confirmPassword", "");
    }
  })

  const {mutate, isLoading} = useEditPassword({
    token,
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setIsError(true);
    }
  })

  useEffect(() => {
    if(isSuccess){
      formik.resetForm();
    }
    if(isError){
      formik.resetForm();
    }
  }, [ isSuccess, isError ]);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-8">
      <div className="toast toast-center">
        {isSuccess ? (<div className="alert alert-success gap-2">
          <GoIssueClosed size={20} />
          <span>Password Berhasil Diubah</span>
          <button onClick={() => setIsSuccess(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>):null}
        {isError ? (<div className="alert alert-error gap-2">
          <AiOutlineCloseCircle size={20} />
          <span>Password Gagal Diubah</span>
          <button onClick={() => setIsError(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>) : null}
      </div>
      <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold">
          Ubah Password
          </h1>
            <form className="w-full">
          <div className="flex flex-col gap-4 w-full px-8">
            <div className="flex flex-col gap-1">
            <InputField
                type="password"
                label="Password Baru"
                name="password"
                classNameLabel="md:text-base"
                placeholder="Masukkan password baru"
                onChange={handleForm}
                value={formik.values.password}
                />
                {formik.errors ? (
                  <p className="text-error-500 text-sm">{formik.errors.password}</p>
                ):null}
            </div>
            <div className="flex flex-col gap-1">
            <InputField
                type="password"
                label="Konfirmasi Password"
                name="confirmPassword"
                classNameLabel="md:text-base"
                placeholder="Masukkan konfirmasi password"
                onChange={handleForm}
                value={formik.values.confirmPassword}
              />
              {formik.errors ? (
                  <p className="text-error-500 text-sm">{formik.errors.confirmPassword}</p>
                ):null}
            </div>
              <div className="flex flex-col-reverse gap-4 mt-8 lg:gap-0 lg:flex-row w-full justify-between">
            <ButtonPrimary className="w-full lg:w-[48%] text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300">
              Batal
            </ButtonPrimary>
            <ButtonPrimary
              className="w-full lg:w-[48%]  text-lg font-medium"
              type={"button"}
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Simpan"
              )}
            </ButtonPrimary>
          </div>
          </div>
            </form>
    </div>
  )
}

export default ChangePasswordSection