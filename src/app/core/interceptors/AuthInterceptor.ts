import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(public authService: AuthService, private route: Router) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }
    return next.handle(request).pipe(
      // timeout(2000),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              // SEGUNDA VEZ ENTRADO, ESTA VEZ UN ERROR 401(NO SE ACTUALIZO EL TOKEN) SE SALE DE LA APLICACION
              this.authService.logout();
              this.route.navigate(['']);
            default:
              return throwError(err);
          }
        }
        return EMPTY;
      }),
      finalize(() => {
        return EMPTY;
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshing) {
      this.authService.logout();
      this.route.navigate(['']);
      return EMPTY;
    }
    this.isRefreshing = true;
    return this.authService.refreshToken().pipe(
      switchMap((token: any) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(token.access);
        this.authService.storeJwtToken(token.access);
        return next.handle(this.addToken(request, token.access));
      })
    );
  }
}
