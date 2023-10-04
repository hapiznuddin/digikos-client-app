import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Label = ({ name, children, className }) => {
  Label.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
  };
  return (
    <label
      htmlFor={name}
      className={twMerge("label block text-lg font-medium text-neutral-800 ", className)}
    >
      {children}
    </label>
  );
};

export default Label;
