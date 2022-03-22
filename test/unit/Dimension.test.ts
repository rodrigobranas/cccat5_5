import Dimension from "../../src/domain/entity/Dimension";

test("Deve criar as dimensões de um item", function () {
	const dimension = new Dimension(100, 30, 10);
	const volume = dimension.getVolume();
	expect(volume).toBe(0.03);
});

test("Deve lançar uma exception se as dimensões forem negativas", function () {
	expect(() => new Dimension(-100, -30, -10)).toThrow(new Error("Invalid dimensions"));
});
