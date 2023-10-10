import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";


const SelectLantai = ({ name, label, classNameLabel, onChange, value, onChangeCapture }) => {
  SelectLantai.propTypes = {
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
    <SelectField value={value} onChange={onChange} name={name} onChangeCapture={onChangeCapture}>
      <option value='' disabled selected>
        Pilih lantai
      </option>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
    </SelectField>
    </div>
  );
};

export default SelectLantai;
