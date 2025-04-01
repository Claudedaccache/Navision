import { Box, styled } from "@mui/material";

export const Background = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  zIndex: -1,
  "&::before": {
    content: '"ERROR"',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "10rem",
    color: "#e0e0e0",
    opacity: 0.5,
  },
});
