import { createTheme } from "@mui/material/styles";

// Extend the PaletteOptions to include a custom tertiary color
declare module "@mui/material/styles" {
  interface Palette {
    orange: Palette["primary"];
  }

  interface PaletteOptions {
    orange?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  cssVariables: true,
  typography: {
    h1: {
      fontFamily: "Inter",
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontFamily: "Inter",
      fontSize: "2rem",
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h3: {
      fontFamily: "Inter",
      fontSize: "1.75rem",
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontFamily: "Inter",
      fontSize: "1.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontFamily: "Inter",
      fontSize: "1.25rem",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },

    h6: {
      fontFamily: "Inter",
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },
  },
  palette: {
    primary: {
      main: "#f9f9f9",
    },

    secondary: {
      main: "#43c2d1",
    },
    orange: {
      main: "#DF2F26",
      light: "#F27B74",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#DF2F26",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#D12C21",
            transform: "scale(1.05)",
          },
        },
        containedSecondary: {
          backgroundColor: "#dc004e",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#115293",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none ",
          color: "inherit",
        },
      },
    },
  },
});

export default theme;
