import Connection from "../../infra/database/Connection";
import OrderDAO from "../dao/OrderDAO";
import GetOrderOutput from "../usecase/get-order/GetOrderOutput";

export default class GetOrderQuery {

	constructor (readonly connection: Connection, readonly orderDAO: OrderDAO) {
	}

	async execute (code: string, limit: number, offset: number): Promise<GetOrderOutput> {
		const orderData = await this.orderDAO.getOrder(code);
		const itemsData = await this.connection.query("select description, price from ccca.order_item join ccca.item using (id_item) where id_order = $1", [orderData.idOrder]);
		const output = new GetOrderOutput(orderData.total, itemsData);
		return output;
	}
}
