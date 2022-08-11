import { CardItem } from "./card-item";

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: string;

    constructor(cardItem: CardItem) {
        this.imageUrl = cardItem.imageUrl;
        this.unitPrice = cardItem.unitPrice;
        this.quantity = cardItem.quantity;
        this.productId = cardItem.id;
    }
}
