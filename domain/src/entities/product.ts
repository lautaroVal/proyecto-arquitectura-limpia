export const ProductType = {
    BURGER: "BURGER",
    DRINK: "DRINK",
    ACOMPANIMENT: "ACOMPANIMENT"
} as const

export type ProductType = (typeof ProductType)[keyof typeof ProductType]

export interface Product {
    id: string,
    name: string,
    price: number,
    available: boolean,
    type: ProductType,
    image: string
}