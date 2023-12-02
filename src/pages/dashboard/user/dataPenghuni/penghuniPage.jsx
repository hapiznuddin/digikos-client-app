import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import Penghuni from "../../../../Components/Templates/Dashboard/User/DataPenghuni/Penghuni";
import { useParams } from "react-router-dom";

const PenghuniPage = () => {
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
      <Penghuni ref={idRef}/>
    </div>
    </HelmetProvider>
  )
}

export default PenghuniPage