import { ButtonProps, Button as MuiButton, styled } from "@mui/material";
import { FC } from "react";

type ButtonType = ButtonProps & {
  variant?: "outlined" | "contained" | "text";
  children: string;
  backgroundColor?: string;
  colors?: string;
};

const Button: FC<ButtonType> = ({
  variant = "text",
  backgroundColor = "#c25d5d",
  colors = "white",
  children,
  ...rest
}) => {
  return (
    <MyButton
      variant={variant}
      {...rest}
      style={{
        backgroundColor: backgroundColor,
        color: colors,
      }}
    >
      {children}
    </MyButton>
  );
};

export default Button;

const MyButton = styled(MuiButton)`
  font-size: 14px;
  color: white;
  &:hover {
    background-color: #b04d4d;
  }
  &:active {
    background-color: #b04d4d;
  }
`;
