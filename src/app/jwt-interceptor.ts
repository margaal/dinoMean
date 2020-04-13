import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DinoService } from './shared/dino.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(DinoService.TOKEN_KEY);
      let clone: HttpRequest<any>;

      if (token) {
        clone = request.clone({
            headers: request.headers.set("Authorization",
                    "Bearer " + token)
          
        });
        return next.handle(clone);
      } 
        return next.handle(request);
    
      
  }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];