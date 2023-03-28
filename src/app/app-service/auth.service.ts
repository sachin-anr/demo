import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { config } from '../config';
import { AuthResponse } from '../model/auth-response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  userr = new BehaviorSubject<User>({});
  currentsubject = this.userr.asObservable();
  signup(_email: string, _password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          config.API_KEY,
        {
          email: _email,
          password: _password,
          returnsec: true,
        }
      )
      .pipe(
        catchError((error) => {
          return throwError(error.message);
        }),
        tap((response) => {
          this.authenticatedUser(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  signin(_email: string, _password: string) {
    return this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          config.API_KEY,
        {
          email: _email,
          password: _password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          return throwError(error.message);
        }),
        tap((response) => {
          console.log('response >>', response);
          this.authenticatedUser(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  autosigninUser() {
    const userdata = JSON.parse(localStorage.getItem('signinUser') || '{}');
    if (!userdata) {
      return;
    }
    const loggedinUSer = new User(
      userdata.email,
      userdata.id,
      userdata._token,
      new Date(userdata._tokenExpirationDate)
    );
    if (loggedinUSer.token)
     this.userr.next(loggedinUSer);
  }

  private authenticatedUser(
    email: any,
    userID: any,
    token: any,
    expireIn: any
  ) {
    console.log('expireIn >>', expireIn);
    const expirationDate = new Date(new Date().getTime() + expireIn * 1000);
    const user = new User(email, userID, token, expirationDate);

    console.log('user >>', user);
    this.userr.next(user);
    localStorage.setItem('signinUser', JSON.stringify(user));
  }
}
