import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { axiosInstance } from '../../../../../lib/axios'
import { useState } from 'react'

const TableRiwayatPenghuni = ({roomId}) => {
  TableRiwayatPenghuni.propTypes = {
    roomId: PropTypes.number
  }
  const token = Cookies.get('token')
  const [dataNotFound, setDataNotFound] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['riwayatPenyewa', roomId],
    queryFn: async () => {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
      const res = await axiosInstance.get(`/rent-history-roomid?room_id=${roomId}`, { headers })
      return res
    },
    onSuccess: (data) => {
      console.log(data?.data)
    },
    onError: (data) => {
      if (data.response.status === 404) {
        setDataNotFound(true)
      }
    }
  })

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">Riwayat Penghuni</h1>
    <div className="overflow-auto bg-neutral-25 max-h-[300px] rounded-xl shadow border border-neutral-100">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary-50 text-base text-neutral-800">
            <tr>
              <th className="font-medium">No</th>
              <th className="font-medium">Nama Penyewa</th>
              <th className="font-medium">No HP</th>
              <th className="font-medium">Alamat</th>
              <th className="font-medium">Tanggal Masuk</th>
              <th className="font-medium">Tanggal Keluar</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (<tr className="text-center">
              <td colSpan={9}>
              <span className="loading loading-spinner loading-lg text-primary-500"/>
              </td>
              </tr>) : (
                dataNotFound ? (
                  <tr className="text-center font-medium">
                    <td colSpan={9}>Tidak Ada Riwayat Penghuni</td>
                  </tr>
                ) : (
                  data?.data.length === 0 ?  (
                    <tr className="text-center font-medium">
                      <td colSpan={9}>Tidak Ada Riwayat Penghuni</td>
                    </tr>
                  ) : (
                  data?.data.map((rent, index) => {
                return (
                  <tr key={index} >
                    <th className="font-medium">{index + 1}</th>
                    <td>{rent.occupant?.name}</td>
                    <td>{rent.occupant?.phone}</td>
                    <td className="max-w-[200px]">{rent.occupant?.address}</td>
                    <td>{formatDate(rent.start_date)}</td>
                    <td>{rent.end_date === undefined ? null : formatDate(rent.end_date)}</td>
                  </tr>
                );
              }))) )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableRiwayatPenghuni