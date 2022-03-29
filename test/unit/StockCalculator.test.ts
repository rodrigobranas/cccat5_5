import StockEntry from "../../src/domain/entity/StockEntry";
import StockCalculator from "../../src/domain/service/StockCalculator";

test("Deve calcular o estoque de um item", function () {
	const calculator = new StockCalculator();
	const stockEntries = [
		new StockEntry(1, "in", 6),
		new StockEntry(1, "out", 2),
		new StockEntry(1, "in", 2)
	];
	const total = calculator.calculate(stockEntries);
	expect(total).toBe(6);
});
