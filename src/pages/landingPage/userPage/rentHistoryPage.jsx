import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../Components/HeadMetaData";
import RentHistorySection from "../../../Components/Templates/LandingPage/UserPage/RentHistory/RentHistorySection";

const RentHistoryPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <HelmetProvider>
        <HeadMetaData title="Riwayat Pengajuan Sewa"/>
      <div>
        <RentHistorySection/>
      </div>
    </HelmetProvider>
  )
}

export default RentHistoryPage