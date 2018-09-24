import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSub: BehaviorSubject<User>;
  user$: Observable<User>;

  constructor(private http: HttpClient) {

    const user = JSON.parse(localStorage.getItem('user') || null);
    this.userSub = new BehaviorSubject(user);
    this.user$ = this.userSub.asObservable();

  }

  login(credentials) {
    return this.http.post<User>(`jwt-auth/v1/token`, credentials)
    .pipe(
      tap((wpUser: User) => {
        this.userSub.next(wpUser);
        localStorage.setItem('wpUser', JSON.stringify(wpUser));
      })
    );
  }
}
