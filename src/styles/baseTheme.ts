import { createTheme } from "@mui/material";

export const baseTheme = createTheme({
  breakpoints: {
    values: {
      xl: 1920,
      lg: 1200,
      md: 900,
      sm: 425,
      xs: 280,
    },
  },
  palette: {
    primary: {
      main: "#3e4a6e",
      light: "#3e4a6e",
      dark: "#3e4a6e",
    },
    secondary: {
      main: "#fdba2b",
      light: "#fdba2b",
      dark: "#fdba2b",
    },
    grey: {
      "500": "#c4c4c4",
      "600": "#646464",
      "700": "#787878",
      "800": "#323232",
    },
  },
  typography: {
    htmlFontSize: 16,
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          color: "#3e4a6e",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "1.4rem",
          lineHeight: "1.6rem",
          textAlign: "center",
        },
        actions: {
          "*": {
            color: "#3e4a6e",
          },
          svg: {
            width: 24,
            height: 24,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "var(--white-900)",
          backgroundColor: "var(--primary-color)",

          fontSize: "1.4rem",
          lineHeight: "1.6rem",
        },
      },
    },
  },
});
