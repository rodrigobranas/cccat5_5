import Connection from "../../infra/database/Connection";
import GetOrderOutput from "../usecase/get-order/GetOrderOutput";

export default class GetOrderQuery {

	constructor (readonly connection: Connection) {
	}

	async execute (code: string): Promise<GetOrderOutput> {
		const [orderData] = await this.connection.query("select * from ccca.order where code = $1", [code]);
		const itemsData = await this.connection.query("select description, o.price from ccca.order_item o join ccca.item i using (id_item) where id_order = $1", [orderData.idOrder]);
		const output = new GetOrderOutput(parseFloat(orderData.total), itemsData);
		return output;
	}
}
