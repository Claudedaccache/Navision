import React, { useEffect, useState } from "react";
import { Stack, Typography, Button, Box, useTheme } from "@mui/material";
import { FormContainer, StyledTextField } from "../mui/customCss";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserContext } from "../context/userContext";
import { loginSchema } from "../joy/validationSchema";
import { userEmail, userPassword } from "../variables";

interface FormData {
  email: string;
  password: string;
}

interface ErrorMessages {
  [key: string]: string;
}

const LogIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorMessages>({});
  const navigate = useNavigate();
  const { setToken } = useUserContext();
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = loginSchema.validate(formData, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.reduce<ErrorMessages>((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(errorMessages);
    } else {
      setErrors({});
      try {
        if (
          formData.email === userEmail &&
          formData.password === userPassword
        ) {
          localStorage.setItem("token", "authorizedUser");
          setToken("authorizedUser");

          navigate("/home");
          toast.success(`Welcome back! 🎉 You’ve successfully logged in.`);
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.message);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.removeItem("token");
      setToken("");
      toast.success("Session expired. Please log in again.");
      navigate("/");
    }, 600000); // 10 minutes

    return () => clearTimeout(timeoutId);
  }, [navigate, setToken]);

  return (
    <Stack
      sx={{
        height: "60vh",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <FormContainer>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: { xs: "80vw", md: "40vw" } }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "700", color: theme.palette.orange.main }}
          >
            Login
          </Typography>
          <StyledTextField
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <StyledTextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button variant="contained" color="primary" fullWidth type="submit">
            Login
          </Button>
        </Box>
      </FormContainer>
    </Stack>
  );
};

export default LogIn;
