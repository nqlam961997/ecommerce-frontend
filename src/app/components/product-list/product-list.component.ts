import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardItem } from 'src/app/common/card-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  thePreviousKeyword: string;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword = this.route.snapshot.paramMap.get('keyword') || "";

    if (theKeyword != this.thePreviousKeyword) {
      this.thePageNumber = 1;
    }

    this.thePreviousKeyword = theKeyword;

    this.productService.searchProductsPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the 'id' param string. Convert string to a number by using a "+" symbol
      let idString = this.route.snapshot.paramMap.get('id') || "1";
      this.currentCategoryId = +idString;
    } else {
      this.currentCategoryId = 1;
    }

    if (this.currentCategoryId != this.previousCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;


    this.productService.getProductListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId).subscribe(this.processResult())
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice} `);

    const theCartItem = new CardItem(product);

    this.cartService.addToCart(theCartItem);
  }

  private processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
}
