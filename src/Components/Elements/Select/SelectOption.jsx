import SelectField from ".";
import PropTypes from "prop-types";
import Label from "../Input/Label";


const SelectOption = ({ name, label, classNameLabel }) => {
  SelectOption.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
  }
  return (
    <div className="flex flex-col">
    <Label htmlFor={name} className={classNameLabel}>{label}</Label>
    <SelectField>
      <option disabled selected>
        Who shot first?
      </option>
      <option>Han Solo</option>
      <option>Greedo</option>
    </SelectField>
    </div>
  );
};

export default SelectOption;
