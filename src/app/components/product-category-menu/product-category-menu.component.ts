import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';


@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productCategoryService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    })
  }

}
