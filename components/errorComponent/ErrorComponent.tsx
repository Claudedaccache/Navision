import { Container, Typography, Button, useTheme } from "@mui/material";
import { Background } from "./style";



const ErrorComponent = () => {

  const theme = useTheme();

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Background>
      <Container style={{ textAlign: "center", zIndex: 1 }}>
        <Typography
          variant="h1"
          component="h2"
          sx={{ color: theme.palette.orange.main, fontSize: "8rem", fontFamily: "math" }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ fontFamily: "math" }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Container>
    </Background>
  );
};

export default ErrorComponent;
