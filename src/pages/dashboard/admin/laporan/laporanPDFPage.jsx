import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { LaporanPDF } from "../../../../Components/Templates/Dashboard/Admin/Laporan/LaporanPDF";

const LaporanPDFPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  const {id} = useParams();
  const idRef = useRef(id);
  return (
  <HelmetProvider>
    <HeadMetaData title="Print Laporan"/>
    <div>
      <LaporanPDF ref={idRef}/>
    </div>
    </HelmetProvider>
  )

}

export default LaporanPDFPage
