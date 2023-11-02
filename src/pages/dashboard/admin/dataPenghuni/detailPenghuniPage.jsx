import { useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import HeadMetaData from "../../../../Components/HeadMetaData";
import DetailPenghuni from "../../../../Components/Fragments/Dashboard/Admin/DataPenghuni/DetailPenghuni";

const DetailPenghuniPage = () => {
  const {id} = useParams();
  const rentIdRef = useRef(id);
  return (
    <HelmetProvider>
        <HeadMetaData title="Detail Pengajuan Sewa"/>
      <div>
        <DetailPenghuni ref={rentIdRef}/>
      </div>
    </HelmetProvider>
  )
}

export default DetailPenghuniPage