import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";


const SelectGender = ({ name, label, classNameLabel, onChange, value, onChangeCapture }) => {
  SelectGender.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    onChangeCapture: PropTypes.func,
  }
  return (
    <div className="flex flex-col">
    <Label htmlFor={name} className={classNameLabel}>{label}</Label>
    <SelectField onChange={onChange} value={value} name={name} onChangeCapture={onChangeCapture}>
      <option value='' disabled selected>
        Pilih jenis Kelamin
      </option>
      <option value="Laki-laki">Laki-laki</option>
      <option value="Perempuan">Perempuan</option>
    </SelectField>
    </div>
  );
};

export default SelectGender;
