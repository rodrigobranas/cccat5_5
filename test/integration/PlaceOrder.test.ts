import PlaceOrder from "../../src/application/usecase/place-order/PlaceOrder";
import PostgreSQLConnectionAdapter from "../../src/infra/database/PostgreSQLConnectionAdapter";
import Connection from "../../src/infra/database/Connection";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import GetStock from "../../src/application/usecase/get-stock/GetStock";
import Mediator from "../../src/infra/mediator/Mediator";
import StockEntryHandler from "../../src/application/handler/StockEntryHandler";

let connection: Connection;
let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
	connection = new PostgreSQLConnectionAdapter();
	repositoryFactory = new DatabaseRepositoryFactory(connection);
	const orderRepository = repositoryFactory.createOrderRepository();
	await orderRepository.clean();
});

test("Deve fazer um pedido", async function () {
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
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(5132);
});

test("Deve fazer um pedido calculando o código", async function () {
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
	const output = await placeOrder.execute(input);
	expect(output.code).toBe("202100000002");
});

test("Deve fazer um pedido deve retirar os itens do estoque", async function () {
	const mediator = new Mediator();
	mediator.register(new StockEntryHandler(repositoryFactory));
	const placeOrder = new PlaceOrder(repositoryFactory, mediator);
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
	const getStock = new GetStock(repositoryFactory);
	const total1 = await getStock.execute(1);
	expect(total1).toBe(-1);
	const total2 = await getStock.execute(2);
	expect(total2).toBe(-1);
	const total3 = await getStock.execute(3);
	expect(total3).toBe(-3);
});

afterEach(async function () {
	await connection.close();
});
