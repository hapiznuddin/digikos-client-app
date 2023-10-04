import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../Elements/Button";
import InputField from "../../Elements/Input";
import "./Login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLoginUser } from "../../../features/auth/useLoginuser";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      const { email, password } = formik.values;
      mutate(
        {
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
      email: yup.string().required("Email wajib diisi").email(),
      password: yup.string().required("Password wajib diisi").min(8),
    }),
  });

  const { mutate, isLoading } = useLoginUser({
    onSuccess: (data) => {
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("name", data.name, { expires: 7 });
      Cookies.set("role", data.role, { expires: 7 });
        if (data.role === "User") {
          navigate("/");
        } 
    },
    onError: (data) => {
      console.log(data);
      Swal.fire({
        title: "Gagal",
        text: "Email atau password salah",
        icon: "error",
        timer: 1500,
      })
    },
  });

  const { email, password } = formik.errors;

  return (
    <>
    {isLoading ? (<div className="flex fixed inset-0 bg-neutral-100/30 z-50 justify-center items-center drop-shadow-xl">
        <span className="loading loading-infinity w-24 bg-primary-500"/>
      </div>): null}
    <div className="flex flex-col md:flex-row lg:flex-row">
      <div className="flex flex-col gap-10 justify-between items-center w-full px-6 mt-16 mb-6 md:mt-24 md:w-5/6 md:px-24 lg:w-3/4 ">
        <div className="flex flex-col gap-6 w-full lg:max-w-lg">
          <div className="flex justify-center mb-12">
            <img
              src="/digikos.png"
              width={200}
              className="mx-auto w-32 md:w-48"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              Selamat Datang
            </h1>
            <p className="text-neutral-600 font-medium md:text-lg">
              Login dibawah untuk akses akunmu
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4 w-full md:gap-4">
              <div className="flex flex-col gap-1">
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  onChange={handleForm}
                  placeholder="Masukkan email"
                  classNameLabel="text-base md:text-xl"
                />
                {formik.errors ? (
                  <p className="text-error-500">{email}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleForm}
                  placeholder="Masukkan password"
                  classNameLabel="text-base md:text-xl"
                />
                {formik.errors ? (
                  <p className="text-error-500">{password}</p>
                ) : null}
              </div>
              <p className="text-neutral-400 text-sm ">Lupa Password</p>
            </div>
            <ButtonPrimary type="submit" className="text-lg font-semibold mt-6">
              Login
            </ButtonPrimary>
          </form>
          <div className="flex justify-center gap-1">
            <p className="text-neutral-500 text-sm md:text-base">
              Belum punya akun?
            </p>
            <p className="text-primary-600 font-medium text-sm md:text-base hover:text-primary-400 cursor-pointer hover:underline">
              <Link to={"/register"}>Daftar</Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 mt-6 text-xs text-neutral-400 md:text-sm lg:flex-row">
          <p>&copy; 2023 digikos. All Right Reserved </p>
          <p>Sistem Manajemen Kost</p>
        </div>
      </div>
      <div className="bgImage mt-24 md:mt-0 md:z-10" />
    </div>
    </>
  );
};

export default LoginPage;
