import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const ButtonPrimary = ({ children, onClick, className, type, disabled }) => {
  ButtonPrimary.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
  };
  return (
    <button
      className={twMerge(
        "btn btn-block bg-primary-500 text-neutral-25 rounded-full shadow-xl hover:bg-primary-600 active:bg-primary-700 active:scale-95 normal-case",
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
