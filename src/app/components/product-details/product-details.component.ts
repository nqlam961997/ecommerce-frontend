import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardItem } from 'src/app/common/card-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.handleGetProduct())
  }
  
  handleGetProduct() {
    const theProductIdString = this.route.snapshot.paramMap.get('id');
    if (theProductIdString != null) {
      const theProductId = +theProductIdString;
      this.productService.getProductDetail(theProductId).subscribe(data => this.product = data);
    }    
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice} `);

    const theCartItem = new CardItem(product);

    this.cartService.addToCart(theCartItem);
  }
}
