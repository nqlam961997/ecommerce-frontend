import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CardItem } from '../common/card-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems: CardItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CardItem) {
    let existingCartItem: CardItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(cardItem => cardItem.id == theCartItem.id);
    }

    if (existingCartItem != undefined) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotal();
  }

  computeCartTotal() {
    let totalPriceValue: number= 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  decrementQuantity(theCardItem: CardItem) {
    theCardItem.quantity--;

    if (theCardItem.quantity == 0) {
      this.remove(theCardItem)
    } else {
      this.computeCartTotal()
    }
  }

  remove(theCardItem: CardItem) {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id == theCardItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotal();
    }
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Content of the cart");

    for (const currentCartItem of this.cartItems) {
      const subTotalPrice = currentCartItem.quantity * currentCartItem.unitPrice;
      console.log(`name=${currentCartItem.name}, price=${subTotalPrice}, quantity=${currentCartItem.quantity}`);
    }

    console.log(`totalPrice: ${totalPriceValue}, totalQuantity: ${totalQuantityValue}`);
  }

}


