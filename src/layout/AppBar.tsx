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

const pages: Record<string, string>[] = [
	{ name: "Stores", path: "/stores" }, 
	{ name: "Products", path: "/products" },
	{ name: "Categories", path: "/categories" } 
]

function Appbar() {
	const navigate = useNavigate()

	const navigateTo = (url: string) => () => {
		navigate(url)
	}

	return (
		<AppBar position="absolute">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
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
							color: "inherit",
							textDecoration: "none",
						}}
					>
            STORE
					</Typography>

					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
            LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
						{pages.map((page: Record<string, string>, index: number) => (
							<Button
								onClick={navigateTo(page.path)}
								key={`${page.name}_${index}`}
								sx={{ my: 2, color: "white", display: "block", fontWeight: 600 }}
							>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Login">
							<IconButton sx={{ p: 0, color: "white" }}>
								<LoginIcon></LoginIcon>
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Appbar
