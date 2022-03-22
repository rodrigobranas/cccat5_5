import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrdersController from "../controller/OrdersController";
import Http from "./Http";

export default class Router {

	constructor (readonly http: Http, readonly repositoryFactory: RepositoryFactory) {
	}

	init () {
		this.http.route("get", "/orders", async (params: any, body: any) => {
			const ordersController = new OrdersController(this.repositoryFactory);
			const output = ordersController.getOrders();
			return output;
		});
	}
}
