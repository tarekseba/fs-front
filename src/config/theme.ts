import { Theme } from "@emotion/react"
import { createTheme } from "@mui/material"
import { teal } from "@mui/material/colors"

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#7743DB"
    },
    secondary: { 
      main: "#FBF0F0"
    },
    text: {
      primary: "#000000"
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "90%",
          borderRadius: "50px",
          top: "1rem !important",
          left: 0,
          right: 0,
          margin: "auto",
          textTransform: "none"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FBF0F0",
          textTransform: "none",
          borderRadius: "10px"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          opacity: 0.8
        }
      }
    }
  }
})
