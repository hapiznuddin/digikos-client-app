import SelectField from ".";
import PropTypes from "prop-types";

const SelectMonth = ({
  name,
  onChange,
  value,
  onChangeCapture,
  defaultValue,
}) => {
  SelectMonth.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    onChangeCapture: PropTypes.func,
    defaultValue: PropTypes.string,
  };
  return (
      <SelectField
        onChange={onChange}
        value={value}
        name={name}
        onChangeCapture={onChangeCapture}
        defaultValue={defaultValue}
      >
        <option value={""}>
          Pilih Bulan
        </option>
        <option value={1} >Januari</option>
        <option value={2} >Februari</option>
        <option value={3} >Maret</option>
        <option value={4} >April</option>
        <option value={5} >Mei</option>
        <option value={6} >Juni</option>
        <option value={7} >Juli</option>
        <option value={8} >Agustus</option>
        <option value={9} >September</option>
        <option value={10} >Oktober</option>
        <option value={11} >November</option>
        <option value={12} >Desember</option>
      </SelectField>
  );
};

export default SelectMonth;
