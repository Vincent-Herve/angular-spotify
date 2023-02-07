import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.accessToken;
    if (token !== null) {
      authReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.handleAuthError();
        }
        throw error;
      })
    );
  }

  private handleAuthError(): void {
    this.token.clearLocalStorage();
    this.router.navigate(['/login']);
  }
}

export const authInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
