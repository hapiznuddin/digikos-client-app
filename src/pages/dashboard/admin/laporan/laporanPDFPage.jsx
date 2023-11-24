import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import { LaporanPDF } from "../../../../Components/Fragments/Dashboard/Admin/Laporan/LaporanPDF";
import { useParams } from "react-router-dom";
import { useRef } from "react";

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
    <HeadMetaData title="Print laporan"/>
    <div>
      <LaporanPDF ref={idRef}/>
    </div>
    </HelmetProvider>
  )

}

export default LaporanPDFPage
