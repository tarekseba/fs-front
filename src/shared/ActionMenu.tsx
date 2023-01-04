import React, { ChangeEvent, MouseEventHandler, ReactNode } from "react"
import { ListSubheader, MenuItem, ButtonProps, Menu, Button, Theme } from "@mui/material"
import { ReactState } from "./utils/types"
import { ClassNameMap, makeStyles } from "@mui/styles"

export interface IAction {
  onClick?: MouseEventHandler<any>
  label?: string
  visible: boolean
  separator?: string
}

const useStyles: () => ClassNameMap<any> = makeStyles((theme: Theme) => ({
  menuList: {
    paddingTop: 0,
    paddingBottom: 0
  }
}))

export interface ActionMenuProps {
  actions: Array<IAction>
  actionLabel?: string
  icon?: ReactNode
  variant?: ButtonProps["variant"]
  color?: ButtonProps["color"]
  loading?: boolean
}

const renderActions = (actions: Array<IAction>): Array<JSX.Element> => {
	return actions.filter((a: IAction) => a.visible).map((action: IAction, index: number) => {
		if (action.separator) {
			return <ListSubheader key={`separator-${index}`} component="div">{action.separator}</ListSubheader>
		} else {
			return <MenuItem key={`${action.label}-${index}`} onClick={action.onClick}>{action.label}</MenuItem>
		}
	})
}

type Anchor = HTMLInputElement | undefined

export const ActionMenu = (props: ActionMenuProps): JSX.Element => {
	const [ anchorEl, setAnchorEl ]: ReactState<Anchor> = React.useState<(HTMLInputElement | undefined)>(undefined)
	const { actions, actionLabel, icon, variant, color, loading }: ActionMenuProps = props

  const styles: ClassNameMap<string> = useStyles()

	const handleToggle = (event: ChangeEvent<any>): void => {
		if (!anchorEl) {
			setAnchorEl(event.currentTarget)
			event.preventDefault()
			event.stopPropagation()
		} else {
			setAnchorEl(undefined)
		}
	}

	return (
		<div>
			<Button
				color={color}
				variant={variant}
				onClick={handleToggle}
				disabled={loading}
				endIcon={icon}
        style={{height: "1.7rem"}}
			>
				{actionLabel}
			</Button>
			<Menu
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClick={handleToggle}
        classes={{list: styles.menuList}}
				anchorOrigin={{
					vertical   : "bottom",
					horizontal : "center"
				}}
				transformOrigin={{
					vertical   : "top",
					horizontal : "center"
				}}
				disableScrollLock
			>
				{renderActions(actions)}
			</Menu>
		</div>
	)
}
