import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import HeadMetaData from "../../../../Components/HeadMetaData";
import DetailTipeKamar from "../../../../Components/Fragments/Dashboard/Admin/DataTipeKamar/DetailTipeKamar";

const DetailTipeKamarPage = () => {
  const {id} = useParams();
  const idRef = useRef(id);
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
        <DetailTipeKamar ref={idRef}/>
      </div>
    </HelmetProvider>
  )
}

export default DetailTipeKamarPage