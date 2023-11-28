import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import PengajuanSewa from "../../../../Components/Templates/Dashboard/Admin/PengajuanSewa/PengajuanSewa";

const PengajuanSewaPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Pengajuan Sewa"/>
    <div>
      <PengajuanSewa/>
    </div>
    </HelmetProvider>
  )
}

export default PengajuanSewaPage