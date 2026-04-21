import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductsResponse } from '../interfaces';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Product {

  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);

  getProductos(offset: number = 0, limit: number = 10): Observable<ProductsResponse> {
    return this.httpClient.get<ProductsResponse>(`${this.baseUrl}/products?limit=${limit}&skip=${offset}`)
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
          return throwError(() => err);
        })
      );;
  }

}
