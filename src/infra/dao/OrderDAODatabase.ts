import OrderDAO from "../../application/dao/OrderDAO";
import OrderData from "../../application/dao/OrderData";
import Connection from "../database/Connection";

export default class OrderDAODatabase implements OrderDAO {

	constructor (readonly connection: Connection) {
	}

	async getOrder(code: string): Promise<OrderData> {
		return this.connection.query("select id_order, total from ccca.order where code = $1 limit $2 offset $3", [code]);
	}
}
