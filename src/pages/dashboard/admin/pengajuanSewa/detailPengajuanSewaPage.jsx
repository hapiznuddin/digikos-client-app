import { useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import HeadMetaData from "../../../../Components/HeadMetaData";
import DetailPengajuanSewa from "../../../../Components/Fragments/Dashboard/Admin/PengajuanSewa/DetailPengajuanSewa";

const DetailPengajuanSewaPage = () => {
  const {id} = useParams();
  const rentIdRef = useRef(id);
  return (
    <HelmetProvider>
        <HeadMetaData title="Detail Pengajuan Sewa"/>
      <div>
        <DetailPengajuanSewa ref={rentIdRef}/>
      </div>
      {/* <div className="fixed bottom-4 right-4">
        <ButtonPrimary className='px-2 shadow-2xl' onClick={scrollToTop} disabled={onTop}>
          <HiChevronDoubleUp size={32}/>
        </ButtonPrimary>
      </div> */}
    </HelmetProvider>
  )
}

export default DetailPengajuanSewaPage