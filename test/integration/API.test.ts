import axios from "axios";
import PlaceOrder from "../../src/application/usecase/place-order/PlaceOrder";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import Connection from "../../src/infra/database/Connection";
import PostgreSQLConnectionAdapter from "../../src/infra/database/PostgreSQLConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let connection: Connection;
let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
	connection = new PostgreSQLConnectionAdapter();
	repositoryFactory = new DatabaseRepositoryFactory(connection);
	const orderRepository = repositoryFactory.createOrderRepository();
	await orderRepository.clean();
});

test.skip("Deve testar a API", async function () {
	const placeOrder = new PlaceOrder(repositoryFactory);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1},
			{ idItem: 2, quantity: 1},
			{ idItem: 3, quantity: 3}
		],
		coupon: "VALE20",
		issueDate: new Date("2021-03-01T10:00:00")
	};
	await placeOrder.execute(input);
	await placeOrder.execute(input);
	await placeOrder.execute(input);
	const response = await axios({
		url: "http://localhost:3002/orders",
		method: "get"
	});
	const orders = response.data;
	expect(orders).toHaveLength(3);
});

afterEach(async function () {
	await connection.close();
});
