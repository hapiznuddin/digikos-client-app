/* eslint-disable react/display-name */
import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import Cookies from "js-cookie";

const SelectNamaKamar = ({ name, label, classNameLabel, onChange, value, onChangeCapture }) => {
  SelectNamaKamar.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    onChangeCapture: PropTypes.func,
  };
  const token = Cookies.get("token");

  const { data } = useQuery({
    queryKey: ["nameRoom"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(
        `/room/select-class`,
        { headers }
      );
      return res;
    },
    onError: () => {
      // refetch();
    },
  });

  // useEffect(() => {
  //   if (floor) {
  //     refetch();
  //   }
  // }, [floor, refetch]);
  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className={classNameLabel}>
        {label}
      </Label>
      <SelectField value={value} onChange={onChange} name={name} onChangeCapture={onChangeCapture}>
            <option value="" disabled selected>
              Pilih Nama kamar
            </option>
            {data?.data.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_name}
              </option>
            ))}
      </SelectField>
    </div>
  );
};

export default SelectNamaKamar;
