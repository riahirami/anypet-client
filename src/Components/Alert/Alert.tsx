import React, { useState, FC } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import {StyledAlert,StyledSnackbar} from "./Alert.style"
import { SnackbarProps } from "./Alert.type";

const AlertComponent: FC<SnackbarProps> = ({ title,severity,onClose, variant   }) => {
  const [openSnack, setOpenSnack] = useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <StyledSnackbar  open={openSnack} autoHideDuration={8000} onClose={handleClose}>
      <StyledAlert
        elevation={6}
        variant={variant}
        onClose={handleClose}
        severity={severity}
      >
        {title}
      </StyledAlert>
    </StyledSnackbar>
  );
};

export default AlertComponent;
