export default class GetOrderOutput {

	constructor (readonly total: number, readonly items: { description: string, price: number } []) {
	}
}
