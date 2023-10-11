import InputField from "../../../../Elements/Input"
import UserLandingPage from "../UserLandingPage"

const ProfileLandingPage = () => {
  return (
    <UserLandingPage>
        <div className="md:w-[420px] lg:w-[600px] mx-auto flex flex-col gap-4 py-12 px-8 justify-center items-center">
            <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold">
                Informasi Pribadi
            </h1>
              <form className="w-full">
            <div className="flex flex-col w-full gap-4">
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
              <InputField
                type="text"
                label="Jenis Kelamin"
                name="fullname"
                classNameLabel="md:text-base"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div className="flex flex-col gap-1">
              <InputField
                type="text"
                label="Alamat"
                name="fullname"
                classNameLabel="md:text-base"
                placeholder="Masukkan nama lengkap"
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
              <InputField
                type="text"
                label="Pekerjaan"
                name="fullname"
                classNameLabel="md:text-base"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            </div>
              </form>
        </div>
    </UserLandingPage>
  )
}

export default ProfileLandingPage