import { Categories } from "../features/Categories/Categories"
import { Products } from "../features/Products/Products"
import { StoreDetails } from "../features/Stores/StoreDetails"
import { Stores } from "../features/Stores/Stores"

export const routes: Record<string, any>[] = [
	{path: "/stores", element: Stores, exact: true},
	{path: "/products", element: Products, exact: true},
	{path: "/categories", element: Categories, exact: true},
	{path: "/store/detail/:id", element: StoreDetails, exact: true}
]
