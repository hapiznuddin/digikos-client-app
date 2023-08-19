import ButtonPrimary from "../../Elements/Button";
import InputField from "../../Elements/Input";
import "./Login.css";

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-6 lg:flex-row">
      <div className="flex flex-col gap-10 justify-between w-full px-6 mt-16 mb-6 md:mt-24 md:w-5/6 md:px-24 lg:px-64">
        <div className="flex flex-col gap-6">
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
          <div className="flex flex-col gap-4 w-full md:gap-5 lg:gap-6">
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
            <p className="text-neutral-400 text-sm">Lupa Password</p>
          </div>
          <ButtonPrimary className="text-lg font-semibold">Login</ButtonPrimary>
          <div className="flex justify-center gap-1">
            <p className="text-neutral-500">Belum punya akun?</p>
            <p className="text-primary-600 font-medium">Daftar</p>
          </div>
        </div>
        <div className="flex justify-center gap-3 text-sm text-neutral-400">
          <p>&copy; 2023 digikos. All Right Reserved </p>
          <p>Sistem Manajemen Kost</p>
        </div>
      </div>
      <div className="bgImage mt-24 md:mt-0 md:z-10" />
    </div>
  );
};

export default LoginPage;
