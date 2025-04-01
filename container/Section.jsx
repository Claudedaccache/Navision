import { Box, Container } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Section = ({ marginTop = "2rem", idRef, children }) => {
  return (
    <Box component="section" sx={{ marginTop }} id={idRef}>
      <Container>{children}</Container>
    </Box>
  );
};

export default Section;
