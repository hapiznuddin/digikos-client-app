import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import { useParams } from "react-router-dom";
import EditTipeKamar from "../../../../Components/Templates/Dashboard/Admin/DataTipeKamar/EditTipeKamar";

const EditTipeKamarPage = () => {
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
    <HeadMetaData title="Edit Tipe Kamar"/>
    <div>
      <EditTipeKamar ref={idRef}/>
    </div>
    </HelmetProvider>
  )
}

export default EditTipeKamarPage