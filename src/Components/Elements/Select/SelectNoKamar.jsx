/* eslint-disable react/display-name */
import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useStore } from "../../../lib/idClassRoom";
import { useEffect } from "react";

const SelectNoKamar = ({ name, label, classNameLabel, floor }) => {
  SelectNoKamar.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    floor: PropTypes.string,
  };
  const id = useStore((state) => state.id);

  const { data, refetch } = useQuery({
    queryKey: ["numberRoom"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const numberRoom = await axiosInstance.get(
        `/number-room?floor=${floor}&id=${id}`,
        { headers }
      );
      return numberRoom;
    },

    onError: (data) => {
      refetch();
      console.log(data);
    },
  });

  useEffect(() => {
    if (floor) {
      refetch();
    }
  }, [floor, refetch]);
  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className={classNameLabel}>
        {label}
      </Label>
      <SelectField>
            <option value='' disabled selected>
              Pilih nomor kamar
            </option>
            {data?.data.number_room.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
      </SelectField>
    </div>
  );
};

export default SelectNoKamar;
