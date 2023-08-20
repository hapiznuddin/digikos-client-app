import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../../Elements/Button";
import InputField from "../../Elements/Input";
import "./Login.css";
import { LoginApi } from "../../../services/AuthApi";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const headers = {
        "Content-Type": "application/json",
        Accept : "application/json",
    }
    LoginApi(data, headers, (status, response) => {
      if (status) {
        console.log(response);
      } else {
        console.log(response);
      }
    })
  }

  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
      <div className="flex flex-col gap-10 justify-between items-center w-full px-6 mt-16 mb-6 md:mt-24 md:w-5/6 md:px-24 lg:w-3/4 ">
        <div className="flex flex-col gap-6 w-full lg:w-3/5 ">
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
              Login dibawah untuk akses akunmu
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 w-full md:gap-5 lg:gap-6">
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Masukkan email"
              required={true}
              {...register("email", { required: true })}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Masukkan password"
              minLength={8}
              required={true}
              {...register("password", { required: true, minLength: 8 })}
            />
            <p className="text-neutral-400 text-sm ">Lupa Password</p>
          </div>
          <ButtonPrimary type="submit" className="text-lg font-semibold w-full mt-6">Login</ButtonPrimary>
          </form>
          <div className="flex justify-center gap-1">
            <p className="text-neutral-500 text-sm md:text-base">
              Belum punya akun?
            </p>
            <p className="text-primary-600 font-medium text-sm md:text-base hover:text-primary-400 cursor-pointer hover:underline">
            <Link to={"/register"}>
                Daftar
              </Link>
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
  );
};

export default LoginPage;
