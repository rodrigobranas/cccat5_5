import OrderData from "./OrderData";

export default interface OrderDAO {
	getOrder (code: string): Promise<OrderData>;
}