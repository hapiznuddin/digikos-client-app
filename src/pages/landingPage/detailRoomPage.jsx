import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../Components/HeadMetaData";
import { useStore } from "../../lib/idClassRoom";
import DetailRoom from "../../Components/Templates/LandingPage/RoomPage/DetailRoom";
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
    </HelmetProvider>
  )
}

export default DetailRoomPage