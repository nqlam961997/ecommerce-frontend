import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardItem } from 'src/app/common/card-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CardItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService, private route: Router) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);

    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

    this.cartService.computeCartTotal();
  }

  incrementQuantity(cardItem: CardItem) {
    this.cartService.addToCart(cardItem);
  }

  decrementQuantity(cardItem: CardItem) {
    this.cartService.decrementQuantity(cardItem);
  }

  removeCartItem(cardItem: CardItem) {
    this.cartService.remove(cardItem);
  }
}
