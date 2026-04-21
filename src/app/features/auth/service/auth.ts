import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, User, UserResponse } from '../interfaces';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Loading } from '../../../shared/services/loading';

@Injectable({
  providedIn: 'root',
})
export class Auth {


  private readonly baseUrl = environment.baseUrl;
  private readonly router = inject(Router);
  private readonly httpClient = inject(HttpClient);
  private readonly loader = inject(Loading);

  login(request: LoginRequest) {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/login`, request);
  }

  setUser(response: LoginResponse) {
    const { accessToken, refreshToken, ...user } = response;

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigate(['/dashboard']);

  }

  getUserInfo(): Observable<UserResponse> {
    this.loader.showSpinner();
    const token = localStorage.getItem('access_token');

    return this.httpClient.get<UserResponse>(`${this.baseUrl}/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
          return throwError(() => err);
        }),
        finalize(() => this.loader.hideSprinner())
      );
  }

  getUser(): User | null {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

}
