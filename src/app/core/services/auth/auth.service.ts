import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/shared/models/Usuario/auth/login';
import { environment } from 'src/environments/environment';
import { of, Observable, EMPTY } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from 'src/app/shared/models/Usuario/auth/token';
import Swal from 'sweetalert2';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'access';
  private readonly REFRESH_TOKEN = 'refresh';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  loginParche(user: Login){
    return this.http.post<any>(`${environment.BaseUrl}auth/empleados/login/`, user)
  }

  login(user: Login): Observable<boolean> {
    return this.http.post<any>(`${environment.BaseUrl}token/`, user).pipe(
      tap((tokens) => {
        const decoded = helper.decodeToken(tokens['access']);
        let type = decoded['user_type'];
        localStorage.setItem('user_id', decoded['user_id']);
        this.doLoginUser(user.username, tokens);
      }),
      mapTo(true),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales Incorrectas!',
        });
        return of(false);
      })
    );
  }

  logout() {
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(environment.BaseUrl, {
      refresh: this.getRefreshToken(),
    });
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  getUser() {
    let token = this.getJwtToken();
    if(token){
      const decoded = helper.decodeToken(token);
      let user = {
        user_id: decoded['user_id'],
        user_type: decoded['user_type'],
      };
      return user;
    }
    return 1
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.clear();
  }
}
