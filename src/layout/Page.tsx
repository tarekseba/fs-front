import React from "react"
import { Toolbar } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { routes } from "../config/routes"
import { Navigate } from "react-router-dom"

export const Page = (): JSX.Element => {
	return <main style={{padding: "3rem 1rem 1rem"}}>
		<Toolbar/>
		<Routes>
			{routes.map(({path, element: Component}, index) => (
				<Route key={`${path}_${index}`} path={path} element={<Component />}/>)
			)}
      <Route path="*" element={<Navigate to={"/stores"}/>}/>)
		</Routes>
	</main>
}
