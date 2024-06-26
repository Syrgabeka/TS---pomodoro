import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type InputProps = TextFieldProps;

const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <TextField label={label} InputLabelProps={{ shrink: true }} {...rest} />
  );
};

export default Input;
