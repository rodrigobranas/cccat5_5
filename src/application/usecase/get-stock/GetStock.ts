import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import StockCalculator from "../../../domain/service/StockCalculator";

export default class GetStock {
	stockEntryRepository: StockEntryRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
	}

	async execute (idItem: number): Promise<number> {
		const stockEntries = await this.stockEntryRepository.getAll(idItem);
		const calculator = new StockCalculator();
		const total = calculator.calculate(stockEntries);
		return total;
	}
}