import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private filteredProductsSubject = new BehaviorSubject<Product[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();

  constructor(private http: HttpClient) { }
  host: string = "http://localhost:3000";

  getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products`);
  }

  searchProducts(keyword: string): void {
    //return this.http.get<Product[]>(`${this.host}/products?name_like=${keyword}`);
    this.http
      .get<Product[]>(`${this.host}/products?name_like=${keyword}`)
      .subscribe((products) => {
        this.filteredProductsSubject.next(products);
      });
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.host}/products/${product.id}`);
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.host+"/products", product);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }

  updateProduct(product: any): Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
}
