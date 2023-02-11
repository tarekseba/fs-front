import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import AdbIcon from "@mui/icons-material/Adb"
import LoginIcon from "@mui/icons-material/Login"
import { useNavigate } from "react-router"
import { Theme, useTheme } from "@mui/material"

/* const useStyles: () => ClassNameMap<any> = makeStyles(() => ({ */
/*   appbar: {  */
/*     "&.MuiAppBar-root": { */
/*       width: "90%", */
/*       borderRadius: "50px", */
/*       /* backgroundColor: "white", */
/*       top: "1rem !important", */
/*       left: 0, */
/*       right: 0, */
/*       margin: "auto", */
/*       color: "black" */
/*     } */
/*   } */
/* })) */

const pages: Record<string, string>[] = [
	{ name: "Stores", path: "/stores" }, 
	{ name: "Products", path: "/products" },
	{ name: "Categories", path: "/categories" } 
]

function Appbar() {
	const navigate = useNavigate()

  const theme: Theme = useTheme()

	const navigateTo = (url: string) => () => {
		navigate(url)
	}

  /* const styles: ClassNameMap<string> = useStyles() */

	return (
		<AppBar position="absolute">
			<Container maxWidth="xl">
				<Toolbar disableGutters >
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: (theme: Theme) => theme.palette.grey[400],
							textDecoration: "none",
						}}
					>
            STORE
					</Typography>
					<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
						{pages.map((page: Record<string, string>, index: number) => (
							<Button
								onClick={navigateTo(page.path)}
								key={`${page.name}_${index}`}
								sx={{ my: 2, display: "block", fontWeight: 600 }}
							>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Login">
							<IconButton sx={{ p: 0 }}>
								<LoginIcon color="secondary"></LoginIcon>
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Appbar
