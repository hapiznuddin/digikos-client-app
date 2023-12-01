import { useFormik } from "formik";
import ButtonPrimary from "../../../../Elements/Button";
import InputField from "../../../../Elements/Input";
import { AiOutlineClose} from "react-icons/ai";

const ChangePasswordModal = () => {
  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async () => {},
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
  });

  return (
    <div className="modal-box w-11/12 max-w-xl p-12 flex flex-col justify-center items-center">
      {/* <div className="toast toast-center">
        <div className="alert alert-success gap-2">
          <GoIssueClosed size={20} />
          <span>Kamar Berhasil Ditambahkan.</span>
          <button onClick={() => setIsSuccess(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="alert alert-error gap-2">
          <AiOutlineCloseCircle size={20} />
          <span>Nomor Kamar Tidak Boleh Sama.</span>
          <button onClick={() => setIsError(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>
      </div> */}
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <AiOutlineClose size={20} />
        </button>
      </form>
      <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold mb-4">
        Ubah Password
      </h1>
      <div className="w-full">
        <div className="flex flex-col gap-4 w-full">
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
            ) : null}
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
              <p className="text-error-500 text-sm">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>
          <div className="modal-action flex flex-col-reverse md:flex-row gap-4 mt-2 lg:gap-2 w-full">
            <form method="dialog" className="w-full ">
              <ButtonPrimary className="w-full text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300">
                Batal
              </ButtonPrimary>
            </form>
            <form method="dialog" className="flex w-full">
              <ButtonPrimary
                className="w-full text-lg font-medium"
                type={"button"}
                // onClick={() => {
                //   formik.handleSubmit();
                // }}
              >
                {/* {profileIsLoading ? (
                <span className="loading loading-infinity loading-md"></span>
                ) : (
                  "Simpan"
                )} */}
                Simpan
              </ButtonPrimary>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
