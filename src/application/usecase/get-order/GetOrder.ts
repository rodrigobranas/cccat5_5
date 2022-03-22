import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import ItemRepository from "../../../domain/repository/ItemRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import GetOrderOutput from "./GetOrderOutput";

export default class GetOrder {
	orderRepository: OrderRepository;
	itemRepository: ItemRepository;
	
	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.orderRepository = repositoryFactory.createOrderRepository();
		this.itemRepository = repositoryFactory.createItemRepository();
	}

	async execute (code: string): Promise<GetOrderOutput> {
		const order = await this.orderRepository.getByCode(code);
		const items: { description: string, price: number }[] = [];
		for (const orderItem of order.orderItems) {
			const item = await this.itemRepository.getById(orderItem.idItem);
			if (!item) throw new Error("Item not found");
			items.push({ description: item.description, price: orderItem.price });
		}
		const output = new GetOrderOutput(order.getTotal(), items);
		return output;
	}
}
