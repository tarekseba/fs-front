import React from "react"
import { Toolbar } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { routes } from "../config/routes"

export const Page = (): JSX.Element => {
	return <main style={{padding: "3rem 1rem 1rem"}}>
		<Toolbar/>
		<Routes>
			{routes.map(({path, element: Component}, index) => (
				<Route key={`${path}_${index}`} path={path} element={<Component />}/>)
			)}
		</Routes>
	</main>
}
