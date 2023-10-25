import { useFormik } from "formik";
import InputField from "../../../../Elements/Input"
import PictureProfile from "../../../LandingPage/UserPage/ProfilePage/PictureProfile"
import * as yup from "yup";
import SelectGender from "../../../../Elements/Select/SelectGender";
import TextAreaField from "../../../../Elements/TextArea/TextAreaField";
import SelectPekerjaan from "../../../../Elements/Select/SelectPekerjaan";
import { useState } from "react";
import { useGetProfile } from "../../../../../services/landingPage/userPage/useGetProfile";
import Cookies from "js-cookie";
import { usePostProfile } from "../../../../../services/landingPage/userPage/usePostProfile";
import Swal from "sweetalert2";
import { useUpdateProfile } from "../../../../../services/landingPage/userPage/useUpdateProfile";
import ButtonPrimary from "../../../../Elements/Button";

const FormProfileSection = () => {
  const token = Cookies.get("token");

  const [statusData, setStatusData] = useState(null);

  const { refetch } = useGetProfile({
    token,
    onSuccess: (data) => {
      formik.setValues({
        name: data?.data.name || "",
        date_birth: data?.data.date_birth || "",
        gender: data?.data.gender || "",
        address: data?.data.address || "",
        phone: data?.data.phone || "",
        occupation: data?.data.occupation || "",
      });
      setStatusData(data?.status);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      date_birth: "",
      gender: "",
      address: "",
      phone: "",
      occupation: "",
    },
    onSubmit: async () => {
      const { name, date_birth, gender, address, phone, occupation } =
        formik.values;
      if (statusData === 200) {
        updateProfile({
          name,
          date_birth,
          gender,
          address,
          phone,
          occupation,
        });
      } else {
        createProfile({
          name,
          date_birth,
          gender,
          address,
          phone,
          occupation,
        });
      }
    },
    validationSchema: yup.object({
      name: yup.string().required("Nama harus diisi"),
      date_birth: yup.string().required("Tanggal lahir harus diisi"),
      gender: yup.string().required("Jenis kelamin harus diisi"),
      address: yup.string().required("Alamat harus diisi"),
      phone: yup.string().required("Nomor HP harus diisi"),
      occupation: yup.string().required("Pekerjaan harus diisi"),
    }),
  });

  const { name, date_birth, gender, address, phone, occupation } =
    formik.errors;

    const { mutate: createProfile, isLoading: profileIsLoading } = usePostProfile(
      {
        token,
        onSuccess: () => {
          refetch();
          Swal.fire({
            title: "Berhasil",
            text: "Profil berhasil dibuat",
            icon: "success",
            timer: 1500,
          });
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );

    const { mutate: updateProfile, isLoading: updateIsLoading } =
    useUpdateProfile({
      token,
      onSuccess: () => {
        refetch();
        Swal.fire({
          title: "Berhasil",
          text: "Profil berhasil diperbarui",
          icon: "success",
          timer: 1500,
        });
      },
      onError: (data) => {
        console.log(data);
      },
    });
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold">
          Profil Anda
        </h1>
        <PictureProfile />
        <form className="w-full ">
          <div className="flex flex-col w-full gap-2 ">
            <div className="flex flex-col gap-1">
              <InputField
                type="text"
                label="Nama Lengkap"
                name="name"
                value={formik.values.name}
                classNameLabel="md:text-base"
                placeholder="Masukkan nama lengkap"
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{name}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <InputField
                type="date"
                label="Tanggal Lahir"
                name="date_birth"
                value={formik.values.date_birth}
                classNameLabel="md:text-base"
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{date_birth}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <SelectGender
                label="Jenis Kelamin"
                name="gender"
                value={formik.values.gender}
                classNameLabel="md:text-base"
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{gender}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <TextAreaField
                type="text"
                label="Alamat"
                name="address"
                value={formik.values.address}
                classNameLabel="md:text-base"
                placeholder="Masukkan alamat"
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{address}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <InputField
                type="text"
                label="No Handphone"
                name="phone"
                value={formik.values.phone}
                classNameLabel="md:text-base"
                placeholder="Masukkan no handphone"
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{phone}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <SelectPekerjaan
                label="Pekerjaan"
                name="occupation"
                value={formik.values.occupation}
                classNameLabel="md:text-base"
                onChange={handleForm}
              />
              {formik.errors ? (
                <p className="text-error-500 text-sm">{occupation}</p>
              ) : null}
            </div>
          </div>
        </form>
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-0 w-full justify-between mt-4">
          <ButtonPrimary
            className="w-full lg:w-[48%] text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300"
            type={"button"}
            onClick={() => window.history.back()}
          >
            Batal
          </ButtonPrimary>
          {statusData === 200 ? (
            <ButtonPrimary
              className="w-full lg:w-[48%] text-lg font-medium"
              type={"button"}
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              {updateIsLoading ? (
                <span className="loading loading-infinity loading-md"></span>
              ) : (
                "Update"
              )}
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              className="w-full lg:w-[48%] text-lg font-medium"
              type={"button"}
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              {profileIsLoading ? (
                <span className="loading loading-infinity loading-md"></span>
              ) : (
                "Simpan"
              )}
            </ButtonPrimary>
          )}
        </div>
    </div>
  )
}

export default FormProfileSection