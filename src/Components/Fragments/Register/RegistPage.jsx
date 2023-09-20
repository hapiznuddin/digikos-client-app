import { Link } from "react-router-dom";
import ButtonPrimary from "../../Elements/Button";
import InputField from "../../Elements/Input";
import './Register.css';
const RegisterPage = () => {
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
              Daftar dibawah untuk buat akunmu
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:gap-4">
            <InputField
              label="Username"
              type="text"
              name="name"
              placeholder="Masukkan username"
              required={true}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Masukkan email"
              required={true}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Masukkan password"
              minLength={8}
              required={true}
            />
          </div>
          <ButtonPrimary className="text-lg font-semibold mt-3">Daftar</ButtonPrimary>
          <div className="flex justify-center gap-1">
            <p className="text-neutral-500 text-sm md:text-base">
              Sudah punya akun sebelumnya?
            </p>
            <p className="text-primary-600 font-medium text-sm md:text-base hover:text-primary-400 cursor-pointer hover:underline">
              <Link to={"/login"}>
                Login
              </Link>
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
  );
};

export default RegisterPage;
