import StockEntry from "../../src/domain/entity/StockEntry";

test("Deve criar uma entrada no estoque", function () {
	const stockEntry = new StockEntry(1, "in", 6);
	expect(stockEntry.idItem).toBe(1);
	expect(stockEntry.operation).toBe("in");
	expect(stockEntry.quantity).toBe(6);
});
