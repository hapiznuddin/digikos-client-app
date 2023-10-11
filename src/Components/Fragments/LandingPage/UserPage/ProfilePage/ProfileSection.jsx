import { FaRegUserCircle } from "react-icons/fa";
import ButtonPrimary from "../../../../Elements/Button";
import InputField from "../../../../Elements/Input";
import SelectGender from "../../../../Elements/Select/SelectGender";
import SelectPekerjaan from "../../../../Elements/Select/SelectPekerjaan";
import TextAreaField from "../../../../Elements/TextArea/TextAreaField";
import UserLandingPage from "../UserLandingPage";
import { IoCameraOutline } from "react-icons/io5";
import { useRef, useState } from "react";

const ProfileLandingPage = () => {
  const [picture, setPicture] = useState(null);
  const img = useRef();
  

  return (
    <UserLandingPage>
      <div className="md:w-[420px] lg:w-[600px] mx-auto flex flex-col gap-4 py-12 px-8 justify-center items-center">
        <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold">
          Informasi Pribadi
        </h1>
        <div className="flex flex-col bg-neutral-200 w-32 h-32 rounded-full relative">
            <img src={picture ? picture : "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"} className="w-full h-full rounded-full" />
            <div className="absolute bottom-1 right-0 bg-neutral-25 shadow w-9 h-9 rounded-full flex justify-center items-center z-10 cursor-pointer" onClick={() => img.current.click()}>
              <IoCameraOutline size={24}/>
            </div>
            <input type="file" className="hidden" accept="image/*"
            ref={img}
              onChange={(e) => {
                let pic = URL.createObjectURL(e.target.files[0]);
                setPicture(pic);
              }}/>
        </div>
        <form className="w-full ">
          <div className="flex flex-col w-full gap-4 ">
            <div className="flex flex-col gap-1">
              <InputField
                type="text"
                label="Nama Lengkap"
                name="fullname"
                classNameLabel="md:text-base"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div className="flex flex-col gap-1">
              <InputField
                type="date"
                label="Tanggal Lahir"
                name="birth_date"
                classNameLabel="md:text-base"
              />
            </div>
            <div className="flex flex-col gap-1">
              <SelectGender
                label="Jenis Kelamin"
                name="fullname"
                classNameLabel="md:text-base"
              />
            </div>
            <div className="flex flex-col gap-1">
              <TextAreaField
                type="text"
                label="Alamat"
                name="fullname"
                classNameLabel="md:text-base"
                placeholder="Masukkan alamat"
              />
            </div>
            <div className="flex flex-col gap-1">
              <InputField
                type="text"
                label="No Handphone"
                name="fullname"
                classNameLabel="md:text-base"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div className="flex flex-col gap-1">
              <SelectPekerjaan
                label="Pekerjaan"
                name="fullname"
                classNameLabel="md:text-base"
              />
            </div>
          </div>
        </form>
        <div className="flex w-full justify-between mt-4">
          <ButtonPrimary className="w-64 text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300"
          type={"button"}
          onClick={() => window.history.back()}>
            Batal
          </ButtonPrimary>
          <ButtonPrimary className="w-64 text-lg font-medium">
            Simpan
          </ButtonPrimary>
        </div>
      </div>
    </UserLandingPage>
  );
};



export default ProfileLandingPage;
