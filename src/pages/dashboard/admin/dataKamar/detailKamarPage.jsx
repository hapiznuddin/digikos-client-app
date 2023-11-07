import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import HeadMetaData from "../../../../Components/HeadMetaData";
import Detailkamar from "../../../../Components/Fragments/Dashboard/Admin/DataKamar/Detailkamar";

const DetailKamarPage = () => {
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
        <HeadMetaData title="Detail Kamar"/>
      <div>
        <Detailkamar ref={idRef}/>
      </div>
    </HelmetProvider>
  )
}

export default DetailKamarPage