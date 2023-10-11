import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import DetailRoom from "../../Components/Fragments/LandingPage/RoomPage/DetailRoom";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../Components/HeadMetaData";
import { useStore } from "../../lib/idClassRoom";
const DetailRoomPage = () => {
  const {id} = useParams();
  const roomRef = useRef(id);
  const setId = useStore((state) => state.setId);

  useEffect(() => {
    setId(id);
  }, [ id, setId ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
        <HeadMetaData title="Detail Kamar"/>
      <div>
        <DetailRoom ref={roomRef}/>
      </div>
      {/* <div className="fixed bottom-4 right-4">
        <ButtonPrimary className='px-2 shadow-2xl' onClick={scrollToTop} disabled={onTop}>
          <HiChevronDoubleUp size={32}/>
        </ButtonPrimary>
      </div> */}
    </HelmetProvider>
  )
}

export default DetailRoomPage