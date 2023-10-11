import { BiEdit } from "react-icons/bi"

const OccupantInformation = () => {
  return (
    <div className="flex flex-col w-full gap-6">
            <div className="flex justify-between">
              <h1 className="text-neutral-800 text-lg md:text-xl lg:text-2xl font-semibold">
                Informasi Penyewa
              </h1>
              <button className="btn btn-ghost btn-sm rounded-full text-sm md:text-base gap-1 text-neutral-600 normal-case hover:bg-primary-50 hover:text-primary-500">
                <BiEdit size={20}/>
                Edit Profil
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Nama Penyewa</h1>
                <h1 className="text-neutral-500 text-base font-medium">Hapiz</h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Nomor HP</h1>
                <h1 className="text-neutral-500 text-base font-medium">0856565656</h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Alamat</h1>
                <h1 className="text-neutral-500 text-base font-medium">Tangerang</h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Jenis Kelamin</h1>
                <h1 className="text-neutral-500 text-base font-medium">Laki-laki</h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Pekerjaan</h1>
                <h1 className="text-neutral-500 text-base font-medium">Karyawan</h1>
              </div>
            </div>
          </div>
  )
}

export default OccupantInformation