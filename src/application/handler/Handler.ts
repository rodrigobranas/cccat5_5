import DomainEvent from "../../domain/event/DomainEvent";

export default interface Handler {
	name: string;
	handle (event: DomainEvent): Promise<void>;
}
