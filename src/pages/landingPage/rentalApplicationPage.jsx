import { useParams } from "react-router-dom";

const RentalApplicationPage = () => {
  const { id } = useParams();

  return (
    <div>rentalApplicationPage {id}</div>
  )
}

export default RentalApplicationPage