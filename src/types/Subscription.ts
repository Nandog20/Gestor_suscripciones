import type { Person } from "./Person";

export interface Subscription {
    id: string,
    name: string,
    price: number,
    paymentDay: number,
    participants: Person[]
}
