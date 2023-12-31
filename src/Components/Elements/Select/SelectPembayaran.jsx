import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";


const SelectPembayaran = ({ name, label, classNameLabel, onChange, value, onChangeCapture }) => {
  SelectPembayaran.propTypes = {
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
        Pilih jangka bayar
      </option>
      <option value="bulan">bulan</option>
      <option value="6 bulan"> 6 bulan</option>
      <option value="tahun">tahun</option>
    </SelectField>
    </div>
  );
};

export default SelectPembayaran;
