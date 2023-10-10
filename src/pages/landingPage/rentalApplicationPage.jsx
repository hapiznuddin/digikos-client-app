import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import RentApplication from "../../Components/Fragments/LandingPage/RentApplicationPage/RentApplication";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../Components/HeadMetaData";

const RentalApplicationPage = () => {
  const { id } = useParams();
  const rentRef = useRef(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
      <HeadMetaData title="Pengajuan Sewa"/>
      <>
        <RentApplication ref={rentRef}/>
      </>
    </HelmetProvider>
  )
}

export default RentalApplicationPage