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
    private _http: HttpClient,
  ) { }

  getProducts() {
    this.loadingSubject.next(true);
    return this._http.get(environment.apiUrl + '/bp/products')
    .subscribe({
      next: (response: any) => {
        this.productsSubject.next(response);
        this.loadingSubject.next(false);
      },
      error: (error) => {
        throw new Error(error);
      }
    });
  }

  productExists(id: string) {
    return this._http.get(environment.apiUrl + '/bp/products/verification', {
      params: {
        id
      }
    })
  }

  createProduct(product: any) {
    // change dates format from dd/mm/yyyy to dd-mm-yyyy
    product.date_release = this.formatDate(product.date_release);
    product.date_revision = this.formatDate(product.date_revision);

    return this._http.post(environment.apiUrl + '/bp/products', product)
    .pipe(
      map((response: any) => {
        const products = [...this.productsSubject.value, response];
        this.productsSubject.next(products);
        return response;
      })
    );
  }

  deleteProduct(id: string) {
    return this._http.delete(environment.apiUrl + '/bp/products' , {
      params: {
        id
      },
      responseType: 'text'
    })
    .pipe(
      map(() => {
        const products = this.productsSubject.value.filter((product: Product) => product.id !== id);
        this.productsSubject.next(products);
        return;
      })
    );
  }

  getProduct(id: string) {
    const products = this.productsSubject.value;
    return products.find((product: Product) => product.id === id);
  }

  editProduct(product: any) {
    // change dates format from dd/mm/yyyy to dd-mm-yyyy
    product.date_release = this.formatDate(product.date_release);
    product.date_revision = this.formatDate(product.date_revision);


    return this._http.put(environment.apiUrl + '/bp/products', product)
    .pipe(
      map((response: any) => {
        const products = this.productsSubject.value.map((p: Product) => {
          if (p.id === product.id) {
            return product;
          }
          return p;
        });
        this.productsSubject.next(products);
        return response;
      })
    );
  }

  // get a date of type string with format dd/mm/yyyy and return a string with format yyyy-mm-dd
  private formatDate(date : string){
    const dateArray = date.split('/');
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  }

}
