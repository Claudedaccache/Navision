// import { Box, styled, TextField, Typography } from "@mui/material";

import {
  Box,
  Checkbox,
  keyframes,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

export const titleUnderline = {
  position: "relative",
  display: "inline-block",
  paddingBottom: "4px",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "0",
    width: "50%",
    height: "2px",
    backgroundColor: "#fff",
  },
};

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "gray",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(0, 0, 0, 0.54)",
  },
  "& .MuiOutlinedInput-input": {
    color: "black",
  },

  "& .MuiOutlinedInput-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px #fff inset",
    WebkitTextFillColor: "#000",
  },
}));

export const RegisterMessage = styled(Typography)(({ theme }) => ({
  marginY: theme.spacing(2),
  paddingTop: theme.spacing(2),
  "& a": {
    color: "green",
    paddingLeft: "4px",
    textDecoration: "underline",
  },
}));

export const FormContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

// Keyframes for fade-in animation
export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.orange.main,
  },

  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.grey[400],
  },

  "& .MuiButtonBase-root.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.grey[300],
  },
}));

export const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-checked": {
    color: theme.palette.primary.main,
  },
  "&.MuiCheckbox-root": {
    color: theme.palette.orange.main,
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

export const glow = keyframes`

  50% {
    color: green;
  }

`;
