import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[]
  }
}