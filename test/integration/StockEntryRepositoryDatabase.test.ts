import StockEntry from "../../src/domain/entity/StockEntry";
import Connection from "../../src/infra/database/Connection";
import PostgreSQLConnectionAdapter from "../../src/infra/database/PostgreSQLConnectionAdapter";
import StockEntryRepositoryDatabase from "../../src/infra/repository/database/StockEntryRepositoryDatabase";

let connection: Connection;

beforeEach(async function () {
	connection = new PostgreSQLConnectionAdapter();
});

test("Deve persistir uma entrada no estoque", async function () {
	const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
	await stockEntryRepository.clean();
	await stockEntryRepository.save(new StockEntry(1, "in", 6));
	await stockEntryRepository.save(new StockEntry(1, "out", 2));
	await stockEntryRepository.save(new StockEntry(1, "in", 2));
	const stockEntries = await stockEntryRepository.getAll(1);
	expect(stockEntries).toHaveLength(3);
});

afterEach(async function () {
	await connection.close();
});
