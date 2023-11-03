/* eslint-disable react/display-name */
import { forwardRef } from "react"
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout"
import Cookies from "js-cookie"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../../../lib/axios"
import { Skeleton, SkeletonText } from "@chakra-ui/react"

const DetailTipeKamar = forwardRef((props, ref) => {
  const token = Cookies.get("token")
  const id = ref.current
  const idParams = parseInt(id)

  const { data, isLoading } = useQuery({
    queryKey: ['detailTipeKamar'],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept : "application/json",
        Authorization: `Bearer ${token}`
      }
      const res = await axiosInstance.get(`/class-room/detail?id=${id}`, { headers: headers })
      return res
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (data) => {
      console.log(data)
    }
    })

    const imgRoom1 = import.meta.env.VITE_DIGIKOS_URL + data?.data.images[0]?.path
    const imgRoom2 = import.meta.env.VITE_DIGIKOS_URL + data?.data.images[1]?.path
    const imgRoom3 = import.meta.env.VITE_DIGIKOS_URL + data?.data.images[2]?.path

    const facilities = () => {
      return data?.data.facility.map((facility) => {
        const facilityArray= [];
        if (facility.ac === 1) {
          facilityArray.push('AC')
        }
        if (facility.kasur === 1) {
          facilityArray.push('Kasur')
        }
        if (facility.lemari === 1) {
          facilityArray.push('Lemari')
        }
        if (facility.meja === 1) {
          facilityArray.push('Meja')
        }
        if (facility.wifi === 1) {
          facilityArray.push('Wifi')
        }
        if (facility.km_luar === 1) {
          facilityArray.push('Kamar Mandi Luar')
        }
        if (facility.km_dalam === 1) {
          facilityArray.push('Kamar Mandi Dalam')
        }
        return facilityArray.join(", ")
      })
    }
    

  return (
    <AdminLayout title="Detail Tipe Kamar" routeParams={idParams}>
      <div className="flex flex-col w-full h-full p-8 gap-8 bg-neutral-25 rounded-2xl border border-neutral-100 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 w-full lg:w-2/5">
            <h1 className="text-neutral-800 mb-2 text-lg md:text-xl font-semibold">
              Data Tipe Kamar
            </h1>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Nama Kamar</p>
                  <p className="w-2/3">: {data?.data.classroom?.room_name}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Fasilitas</p>
                  <p className="w-2/3">: {facilities()}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Ukuran</p>
                  <p className="w-2/3">: {data?.data.classroom?.room_size}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Harga</p>
                  <p className="w-2/3">: {data?.data.classroom?.room_price}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Deposit</p>
                  <p className="w-2/3">: {data?.data.classroom?.room_deposite}</p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <>
                <Skeleton height="25px" w={"200px"} />
                <SkeletonText noOfLines={8} w={"400px"} />
                </>
              ) : (
                <>
                <div className="flex">
                  <p className="w-1/3 lg:w-40">Deskripsi</p>
                  <p>:</p>
                </div>
                  <p className="text-xs md:text-sm w-full">{data?.data.classroom?.room_description}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-3/5 ">
            <h1 className="text-neutral-800 mb-2 text-lg md:text-xl font-semibold">
              Gambar Tipe Kamar
            </h1>
          <div className="flex flex-col w-full gap-4 p-4 rounded-2xl border border-neutral-200">
              <div className="w-full h-96 bg-neutral-300 rounded-xl">
                {isLoading ? (
                  <Skeleton
                    className="w-full h-full"
                    style={{ borderRadius: "16px" }}
                  />
                ) : (
                  <img src={imgRoom1} className="w-full h-full rounded-xl object-cover object-center" />
                )}
              </div>
              <div className="flex w-full gap-4">
              <div className="w-1/2 h-48 bg-neutral-300 rounded-xl">
                {isLoading ? (
                  <Skeleton
                    className="w-full h-full"
                    style={{ borderRadius: "16px" }}
                  />
                ) : (
                  <img src={imgRoom2} className="w-full h-full rounded-xl object-cover object-center" />
                )}
              </div>
              <div className="w-1/2 h-48 bg-neutral-300 rounded-xl">
                {isLoading ? (
                  <Skeleton
                    className="w-full h-full"
                    style={{ borderRadius: "16px" }}
                  />
                ) : (
                  <img src={imgRoom3} className="w-full h-full rounded-xl object-cover object-center" />
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
})

export default DetailTipeKamar