import Order from "../entity/Order";

export default interface OrderRepository {
	save(order: Order): Promise<void>;
	getByCode(code: string): Promise<Order>;
	getAll(): Promise<Order[]>;
	count(): Promise<number>;
	clean(): Promise<void>;
}
