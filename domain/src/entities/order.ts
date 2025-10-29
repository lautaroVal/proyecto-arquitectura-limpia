import { ItemOrder } from "./itemOrder"

export const orderState = {
    PENDING: "PENDING",
    INPREPARATION: "INPREPARATION",
    READY: "READY",
    DELIVERED: "DELIVERED",
    CANCELED: "CANCELED"
} as const

export type orderState = (typeof orderState)[keyof typeof orderState]

export interface Order {
    id: string,
    clientId: string,
    items: ItemOrder[],
    total: number,
    state: orderState,
    date: Date
}