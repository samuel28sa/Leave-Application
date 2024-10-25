import { PiSpinnerGapBold } from "react-icons/pi";

const Spinner = ({ className }) => {
  return (
    <PiSpinnerGapBold className={`w-6 h-6 mx-auto animate-spin ${className}`} />
  );
};

export default Spinner;
