import { categoryActions } from "./categoriesActions"
import { productActions } from "./productActions"
import { storeActions } from "./storeActions"

export const mainActions = {
	/* user: userActions, */
	product: productActions,
	store: storeActions,
	category: categoryActions
}
