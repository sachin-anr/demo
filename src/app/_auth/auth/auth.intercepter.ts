import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from 'src/app/app-service/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor (private _authservice : AuthService)
    {

    }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    return this._authservice.userr.pipe(take(1),
    exhaustMap(user =>{
      console.log("User >>>",user)
      const modifiedreq = req.clone({
       
        params : new HttpParams().set('auth', user.token)
      })
      return next.handle(modifiedreq);
    }))
   
  }
}
