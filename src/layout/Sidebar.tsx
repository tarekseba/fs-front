import * as React from "react"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MailIcon from "@mui/icons-material/Mail"
import { useNavigate } from "react-router-dom"

const drawerWidth = 240

interface Props {
  navigate: (url: string) => any
}

const ResponsiveDrawer = ({ navigate }: Props): JSX.Element => {
	const drawer = (
		<div>
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Products", "Trash", "Spam"].map((text, index) => (
					<ListItem key={text} disablePadding onClick={navigate(`/${text.toLowerCase()}`)}>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	)

	return (
		<Box sx={{ display: "flex" }}>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
			</Box>
		</Box>
	)
}
export const Sidebar = (): JSX.Element => {
	const navigate = useNavigate()
	const navigateTo = (url: string) => () => {
		navigate(url)
	}
	return <ResponsiveDrawer navigate={navigateTo}></ResponsiveDrawer>
}
