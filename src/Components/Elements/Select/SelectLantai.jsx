import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";


const SelectLantai = ({ name, label, classNameLabel }) => {
  SelectLantai.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
  }
  return (
    <div className="flex flex-col">
    <Label htmlFor={name} className={classNameLabel}>{label}</Label>
    <SelectField>
      <option disabled selected>
        Pilih lantai
      </option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </SelectField>
    </div>
  );
};

export default SelectLantai;
