import { Alert } from "@mui/material";

interface ErrorAlertProps {
  message?: string;
  className?: string;
}

const ErrorAlert = ({ message = "An error occurred", className = "" }: ErrorAlertProps) => {
  return (
    <Alert severity="error" className={`max-w-lg mx-auto mt-4 ${className}`}>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
