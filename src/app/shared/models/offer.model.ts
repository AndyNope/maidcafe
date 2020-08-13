export interface Offer {
    id?: string;
    name: string;
    price: number;
    image: string;
    description: string;
    status: number;
    deleted: number;
    created: string;
}

export interface OfferEdit {
    id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
}
