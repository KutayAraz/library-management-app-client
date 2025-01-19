import { CircularProgress } from "@mui/material";

const LoadingSpinner = ({ minHeight = "50vh" }) => {
  return (
    <div className={`flex justify-center items-center min-h-[${minHeight}]`}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
