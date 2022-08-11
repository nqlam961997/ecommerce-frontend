import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProduct(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetProductsResponse> {
    const url = `${this.baseUrl}/search/findByNameContaining` + `?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetProductsResponse>(url);
  }

  getProductDetail(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetProductsResponse> {
    const url = `${this.baseUrl}/search/findByCategoryId` + `?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetProductsResponse>(url);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetProductsResponse {
  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
