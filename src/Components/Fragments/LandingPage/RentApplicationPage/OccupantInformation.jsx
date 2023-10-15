import { BiEdit } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useGetProfile } from "../../../../features/landingPage/userPage/useGetProfile"
import Cookies from "js-cookie"
import { useIdOccupantStore } from "../../../../lib/idClassRoom"
import { useEffect } from "react"
import { Skeleton } from "@chakra-ui/react"

const OccupantInformation = () => {
  const token = Cookies.get("token")
  const { data, isLoading } = useGetProfile({
    token,
    onError: (data) => {
      console.log(data)
    }
  })
  const setId = useIdOccupantStore((state) => state.setId);
  useEffect(() => {
    setId(data?.data.id);
  }, [data, setId]);
  return (
    <div className="flex flex-col w-full gap-6">
            <div className="flex justify-between">
              <h1 className="text-neutral-800 text-lg md:text-xl lg:text-2xl font-semibold">
                Informasi Penyewa
              </h1>
              <Link to="/user/profil">
              <button className="btn btn-ghost btn-sm rounded-full text-sm md:text-base gap-1 text-neutral-600 normal-case hover:bg-primary-50 hover:text-primary-500">
                <BiEdit size={20}/>
                Edit Profil
              </button>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Nama Penyewa</h1>
                {isLoading ? (<Skeleton className="w-28 h-5"/>) : (<h1 className="text-neutral-500 text-base font-medium">{data?.data.name}</h1>)}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Nomor HP</h1>
                {isLoading ? (<Skeleton className="w-40 h-5"/>) : (<h1 className="text-neutral-500 text-base font-medium">{data?.data.phone}</h1>)}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Alamat</h1>
                {isLoading ? (<Skeleton className="w-56 h-5"/>) : (<h1 className="text-neutral-500 text-base font-medium">{data?.data.address}</h1>)}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Jenis Kelamin</h1>
                {isLoading ? (<Skeleton className="w-28 h-5"/>) : (<h1 className="text-neutral-500 text-base font-medium">{data?.data.gender}</h1>)}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-neutral-700 text-lg font-semibold">Pekerjaan</h1>
                {isLoading ? (<Skeleton className="w-28 h-5"/>) : (<h1 className="text-neutral-500 text-base font-medium">{data?.data.occupation}</h1>)}
              </div>
            </div>
          </div>
  )
}

export default OccupantInformation