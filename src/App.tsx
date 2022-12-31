import React, { useEffect } from "react"
import { CssBaseline } from "@mui/material"
import { useAppActions, useAppSelector } from "./appRedux/hooks"
import { MainActions } from "./appRedux/types"
import { RootState } from "./appRedux/store"
import { BrowserRouter as Router } from "react-router-dom"
import { Layout } from "./layout/Layout"
import { defaultSearchCriteria } from "./utils/types"
import { ModalProvider } from "./shared/Modal/ModalProvider"

const App = (): JSX.Element => {
	const actions: MainActions = useAppActions()
	const { product } = useAppSelector((state: RootState) => state)
	useEffect(() => {
		console.log("making the request")
		actions.product.get.product(1)
			.then((data: any) => console.log("product ", data))
			.catch((err: any) => console.log(err))
		actions.category.get.categories(defaultSearchCriteria)
			.then((data: any) => console.log("category ", data))
			.catch((err: any) => console.log(err))
	}, [])
	return (
		<>
      <ModalProvider>
        <Router>
          {product.is_loading && <div>it is loading</div>}
          <CssBaseline />
          <Layout></Layout>
        </Router>
      </ModalProvider>
		</>
	)
}

export default App

/* const useStyles: () => ClassNameMap<any> = makeStyles((theme: Theme) => ({ */
/*   root : { */
/*     backgroundColor : theme.template.layout.backgroundColor, */
/*     minHeight       : "100vh" */
/*   }, */
/*   body : { */
/*     display                         : "flex", */
/*     [theme.breakpoints.down( "lg")] : { */
/*       margin : theme.spacing(0, 1) */
/*     } */
/*   }, */
/*   main : { */
/*     width                        : `calc(100% - ${theme.template.sideBar.width}px)`, */
/*     [theme.breakpoints.up("md")] : { */
/*       padding : theme.spacing(2, 0, 0, 2) */
/*     }, */
/*     [theme.breakpoints.down("md")] : { */
/*       paddingTop : theme.spacing(2), */
/*       width      : "100%" */
/*     } */
/*   } */
/* })) */
