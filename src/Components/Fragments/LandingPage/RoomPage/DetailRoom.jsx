/* eslint-disable react/display-name */
import { forwardRef } from "react"

const DetailRoom = forwardRef((props, ref) => {

  return (
    <div>DetailRoom {ref.current}</div>
  )
});

export default DetailRoom