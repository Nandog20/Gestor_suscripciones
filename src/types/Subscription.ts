import type { Participant} from "./Person";

export interface Subscription {
    name: string,
    price: number,
    paymentDay: number,
    participants: Participant[]
}