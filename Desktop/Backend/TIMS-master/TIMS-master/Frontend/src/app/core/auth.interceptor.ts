import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  //const token = localStorage.getItem('auth_token');
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (request.url.includes('/authenticate') || request.url.includes('/login') || !token) {
    return next(request);
  }
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};
