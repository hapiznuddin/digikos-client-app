import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";


const SelectNoKamar = ({ name, label, classNameLabel }) => {
  SelectNoKamar.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
  }
  return (
    <div className="flex flex-col">
    <Label htmlFor={name} className={classNameLabel}>{label}</Label>
    <SelectField>
      <option disabled selected>
        Pilih nomor kamar
      </option>
      <option>1.1</option>
      <option>1.2</option>
      <option>2.3</option>
    </SelectField>
    </div>
  );
};

export default SelectNoKamar;
