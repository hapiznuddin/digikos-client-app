import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";

const SelectPekerjaan = ({
  name,
  label,
  classNameLabel,
  onChange,
  value,
  onChangeCapture,
  defaultValue,
}) => {
  SelectPekerjaan.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    onChangeCapture: PropTypes.func,
    defaultValue: PropTypes.string,
  };
  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className={classNameLabel}>
        {label}
      </Label>
      <SelectField
        onChange={onChange}
        value={value}
        name={name}
        onChangeCapture={onChangeCapture}
        defaultValue={defaultValue}
      >
        <option value="" disabled selected>
          Pilih pekerjaan
        </option>
        <option value="Karyawan">Karyawan</option>
        <option value="Mahasiswa">Mahasiswa</option>
      </SelectField>
    </div>
  );
};

export default SelectPekerjaan;
