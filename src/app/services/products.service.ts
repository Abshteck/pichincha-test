import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private _http: HttpClient
  ) { }

  getProducts() {
    this.loadingSubject.next(true);
    this._http.get(environment.apiUrl + '/bp/products')
    .subscribe({
      next: (response: any) => {
        this.productsSubject.next(response.data);
        this.loadingSubject.next(false);
      },
      error: (error) => {
        throw new Error(error);
      }
    });
  }

}
