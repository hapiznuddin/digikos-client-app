import { useFormik } from "formik";
import ButtonPrimary from "../../../../Elements/Button";
import Input from "../../../../Elements/Input/Input";
import TextAreaField from "../../../../Elements/TextArea/TextAreaField";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAddTipekamar } from "../../../../../services/dashboard/admin/dataTipeKamar/useDataTipekamar";

const TambahTipeKamar = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const handleFacilities = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked);
  };
  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      size: "",
      price: 0,
      deposit: 0,
      description: "",
      facilities_ac: false,
      facilities_kasur: false,
      facilities_lemari: false,
      facilities_meja: false,
      facilities_wifi: false,
      facilities_km_luar: false,
      facilities_km_dalam: false,
    },
    onSubmit: async () => {
      const {
        name,
        size,
        price,
        deposit,
        description,
        facilities_ac,
        facilities_kasur,
        facilities_lemari,
        facilities_meja,
        facilities_wifi,
        facilities_km_luar,
        facilities_km_dalam,
      } = formik.values;
      mutate({
        name,
        size,
        price,
        deposit,
        description,
        facilities_ac,
        facilities_kasur,
        facilities_lemari,
        facilities_meja,
        facilities_wifi,
        facilities_km_luar,
        facilities_km_dalam,
      });
    },
  });

  const { mutate } = useAddTipekamar({
    token,
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil",
        text: "Tipe Kamar Berhasil Dibuat",
        icon: "success",
        timer: 1500,
      }).then(() => {
        navigate("/admin/dashboard/dataTipeKamar");
      });
    },
    onError: (data) => {
      console.log(data);
      Swal.fire({
        title: "Gagal",
        text: "Tipe Kamar Gagal Dibuat",
        icon: "error",
        timer: 1500,
      });
    },
  });

  return (
    <AdminLayout title="Tambah Tipe Kamar">
      <div className="flex flex-col items-center w-full h-full p-8 gap-8 bg-neutral-25 rounded-2xl border border-neutral-100 shadow-lg">
        <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">
          Tambah Tipe Kamar
        </h1>
        <div className="flex flex-col gap-4 lg:gap-8 p-4 w-full lg:max-w-4xl items-center">
          <div className="flex flex-col md:flex-row w-full gap-2 justify-center md:items-center">
            <label
              className="text-neutral-800 font-medium w-48 text-base lg:text-lg"
              htmlFor="name"
            >
              Nama Kamar
            </label>
            <Input
              name="name"
              type="text"
              onChange={handleForm}
              placeholder="Masukkan Nama Kamar"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2 justify-center md:items-center">
            <label
              className="text-neutral-800 font-medium w-48 text-base lg:text-lg"
              htmlFor="size"
            >
              Ukuran Kamar
            </label>
            <Input
              name="size"
              type="text"
              onChange={handleForm}
              placeholder="Masukkan Ukuran Kamar"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2 justify-center md:items-center">
            <label
              className="text-neutral-800 font-medium w-48 text-base lg:text-lg"
              htmlFor="price"
            >
              Harga Kamar
            </label>
            <Input
              name="price"
              type="number"
              onChange={handleForm}
              inputMode="numeric"
              placeholder="Masukkan Harga Kamar"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2 justify-center md:items-center">
            <label
              className="text-neutral-800 font-medium w-48 text-base lg:text-lg"
              htmlFor="deposit"
            >
              Harga Deposit
            </label>
            <Input
              name="deposit"
              type="number"
              onChange={handleForm}
              inputMode="numeric"
              placeholder="Masukkan Harga Deposit"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full md:-mt-4 justify-center md:items-center">
            <label
              className="text-neutral-800 -mb-2 font-medium w-48 text-base lg:text-lg"
              htmlFor="description"
            >
              Deskripsi
            </label>
            <TextAreaField
              name="description"
              onChange={handleForm}
              type="text"
              placeholder="Masukkan Deskripsi"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full">
            <p className="text-neutral-800 font-medium w-48 text-base lg:text-lg">
              Fasilitas
            </p>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-4 w-full">
                <input
                  type="checkbox"
                  name="facilities_ac"
                  className="checkbox checkbox-primary"
                  onChange={handleFacilities}
                />
                <p className="text-neutral-800 font-medium  text-base lg:text-lg">
                  AC
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <input
                  type="checkbox"
                  name="facilities_kasur"
                  className="checkbox checkbox-primary"
                  onChange={handleFacilities}
                />
                <p className="text-neutral-800 font-medium  text-base lg:text-lg">
                  Kasur
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <input
                  type="checkbox"
                  name="facilities_lemari"
                  className="checkbox checkbox-primary"
                  onChange={handleFacilities}
                />
                <p className="text-neutral-800 font-medium  text-base lg:text-lg">
                  Lemari
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <input
                  type="checkbox"
                  name="facilities_meja"
                  className="checkbox checkbox-primary"
                  onChange={handleFacilities}
                />
                <p className="text-neutral-800 font-medium text-base lg:text-lg">
                  Meja
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <input
                  type="checkbox"
                  name="facilities_wifi"
                  className="checkbox checkbox-primary"
                  onChange={handleFacilities}
                />
                <p className="text-neutral-800 font-medium text-base lg:text-lg">
                  Wifi
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <input
                  type="checkbox"
                  name="facilities_km_luar"
                  className="checkbox checkbox-primary"
                  onChange={handleFacilities}
                />
                <p className="text-neutral-800 font-medium text-base lg:text-lg">
                  Kamar Mandi Luar
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <input
                  type="checkbox"
                  name="facilities_km_dalam"
                  className="checkbox checkbox-primary"
                  onChange={handleFacilities}
                />
                <p className="text-neutral-800 font-medium  text-base lg:text-lg">
                  Kamar Mandi Dalam
                </p>
              </div>
            </div>
          </div>
          <ButtonPrimary
            className={"text-sm md:text-base font-medium"}
            type="button"
            onClick={() => formik.handleSubmit()}
          >
            Simpan
          </ButtonPrimary>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TambahTipeKamar;
