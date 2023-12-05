import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import HeadMetaData from "../../../../Components/HeadMetaData";
import KirimPesan from "../../../../Components/Templates/Dashboard/User/KirimPesan/KirimPesan";

const KirimPesanPage = () => {
  const token = Cookies.get("token");
  const {id} = useParams();
  const idRef = useRef(id);
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Data Penghuni"/>
    <div>
      <KirimPesan ref={idRef}/>
    </div>
    </HelmetProvider>
  )
}

export default KirimPesanPage