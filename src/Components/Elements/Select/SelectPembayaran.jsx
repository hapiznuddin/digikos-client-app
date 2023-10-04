import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";


const SelectPembayaran = ({ name, label, classNameLabel, onChange, value }) => {
  SelectPembayaran.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }
  return (
    <div className="flex flex-col">
    <Label htmlFor={name} className={classNameLabel}>{label}</Label>
    <SelectField onChange={onChange} value={value}>
      <option disabled selected>
        Pilih jangka bayar
      </option>
      <option value="bulan">Perbulan</option>
      <option value="6 bulan">Per 6 bulan</option>
      <option value="tahun">Pertahun</option>
    </SelectField>
    </div>
  );
};

export default SelectPembayaran;
