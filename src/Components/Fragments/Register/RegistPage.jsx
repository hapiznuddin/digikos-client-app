import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../Elements/Button";
import InputField from "../../Elements/Input";
import "./Register.css";
import { useFormik } from "formik";
import * as yup from "yup";
import {} from "axios";
import Swal from "sweetalert2";
import { useRegisteruser } from "../../../features/auth/useRegisterUser";

const RegisterPage = () => {
  const navigate = useNavigate();

  // * Handle Form onChange
  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  // * Formik Validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async () => {
      const { name, email, password } = formik.values;
      mutate(
        {
          name,
          email,
          password,
        },
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      );
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Username wajib diisi").min(3),
      email: yup.string().required("Email wajib diisi").email(),
      password: yup.string().required("Password wajib diisi").min(8),
    }),
  });

  // * Register User API & Validation
  const { mutate, isLoading } = useRegisteruser({
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil",
        text: "Akun berhasil dibuat",
        icon: "success",
        timer: 1500,
      }).then(() => {
        navigate("/login");
      });
    },
    onError: (data) => {
      Swal.fire({
        title: "Gagal",
        text: data.response.data.message,
        icon: "error",
        timer: 1500,
      });
    },
  });
  const { name, email, password } = formik.errors;

  return (
    <>
      {isLoading ? (
        <div className="flex fixed inset-0 bg-neutral-100/30 z-50 justify-center items-center drop-shadow-xl">
          <span className="loading loading-infinity w-24 bg-primary-500" />
        </div>
      ) : null}
      <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="flex flex-col gap-10 justify-between items-center w-full px-6 mt-16 mb-6 md:mt-24 md:w-5/6 md:px-24 lg:w-3/4 ">
          <div className="flex flex-col gap-6 w-full lg:max-w-lg ">
            <div className="flex justify-center mb-12">
              <img
                src="/digikos.png"
                width={200}
                className="mx-auto w-32 md:w-48"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
                Selamat Datang
              </h1>
              <p className="text-neutral-600 font-medium md:text-lg">
                Daftar dibawah untuk buat akunmu
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div
                className={
                  name || email || password
                    ? "flex flex-col gap-4 w-full md:gap-0"
                    : "flex flex-col gap-4 w-full md:gap-3"
                }
              >
                <div className="flex flex-col gap-1 w-full">
                  <InputField
                    label="Username"
                    type="text"
                    name="name"
                    placeholder="Masukkan username"
                    onChange={handleForm}
                    classNameLabel="text-base md:text-xl"
                  />
                  {formik.errors ? (
                    <p className="text-error-500">{name}</p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Masukkan email"
                    onChange={handleForm}
                    classNameLabel="text-base md:text-xl"
                  />
                  {formik.errors ? (
                    <p className="text-error-500">{email}</p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Masukkan password"
                    onChange={handleForm}
                    classNameLabel="text-base md:text-xl"
                  />
                  {formik.errors ? (
                    <p className="text-error-500">{password}</p>
                  ) : null}
                </div>
              </div>
              <ButtonPrimary
                type="submit"
                className="text-lg font-semibold mt-8"
              >
                Daftar
              </ButtonPrimary>
            </form>
            <div className="flex justify-center gap-1 md:flex-col md:items-center lg:flex-row">
              <p className="text-neutral-500 text-sm md:text-base">
                Sudah punya akun sebelumnya?
              </p>
              <p className="text-primary-600 font-medium text-sm md:text-base hover:text-primary-400 cursor-pointer hover:underline">
                <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 mt-6 text-xs text-neutral-400 md:text-sm lg:flex-row">
            <p>&copy; 2023 digikos. All Right Reserved </p>
            <p>Sistem Manajemen Kost</p>
          </div>
        </div>
        <div className="bgImageReg mt-2 md:mt-0" />
      </div>
    </>
  );
};

export default RegisterPage;
