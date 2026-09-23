export interface Person {
    id: string,
    name: string
}

export interface Participant {
    person: Person,
    hasPaid: boolean
}