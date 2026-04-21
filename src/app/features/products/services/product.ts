import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { productRequest, ProductsResponse,Product as ProductInterface } from '../interfaces';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Loading } from '../../../shared/services/loading';


@Injectable({
  providedIn: 'root',
})
export class Product {




  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);
  private readonly loader = inject(Loading);


  getProductos(offset: number = 0, limit: number = 10): Observable<ProductsResponse> {
    this.loader.showSpinner()
    return this.httpClient.get<ProductsResponse>(`${this.baseUrl}/products?limit=${limit}&skip=${offset}`)
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
          return throwError(() => err);
        }
        ),
        finalize(() => this.loader.hideSprinner())
      );
  }

  getProductById(id:number) {
    this.loader.showSpinner()
    return this.httpClient.get<ProductInterface>(`${this.baseUrl}/products/${id}`)
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
          return throwError(() => err);
        }
        ),
        finalize(() => this.loader.hideSprinner())
      );
  }

  saveProduct(request: productRequest) {
    this.loader.showSpinner()
    return this.httpClient.post(`${this.baseUrl}/products/add`, request)
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
          return throwError(() => err);
        }
        ),
        finalize(() => this.loader.hideSprinner())
      );
  }

}
