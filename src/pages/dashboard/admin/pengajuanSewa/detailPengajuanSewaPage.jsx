import { useEffect, useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import HeadMetaData from "../../../../Components/HeadMetaData";
import Cookies from "js-cookie";
import DetailPengajuanSewa from "../../../../Components/Templates/Dashboard/Admin/PengajuanSewa/DetailPengajuanSewa";

const DetailPengajuanSewaPage = () => {
  const {id} = useParams();
  const rentIdRef = useRef(id);
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
    <HelmetProvider>
        <HeadMetaData title="Detail Pengajuan Sewa"/>
      <div>
        <DetailPengajuanSewa ref={rentIdRef}/>
      </div>
    </HelmetProvider>
  )
}

export default DetailPengajuanSewaPage