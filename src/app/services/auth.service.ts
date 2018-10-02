import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../interfaces/user.interfaces';
import { UserProfile } from '../interfaces/user-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSub: BehaviorSubject<User>;
  user$: Observable<User>;

  userProfileSub: BehaviorSubject<UserProfile>;
  userProfile$: Observable<UserProfile>;

  constructor(private http: HttpClient) {

    const user = JSON.parse(localStorage.getItem('wpUser') || null);
    this.userSub = new BehaviorSubject(user);
    this.user$ = this.userSub.asObservable();

    this.userProfileSub = new BehaviorSubject(null);
    this.userProfile$ = this.userProfileSub.asObservable();


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

  getUserProfile(id: number) {
    return this.http.get<UserProfile>(`wp/v2/users/${id}`);
  }

  logout() {
    this.userSub.next(null);
    this.userProfileSub.next(null);
    localStorage.removeItem('wpUser');
  }

  isLoggedIn() {
    return this.user$;
  }

}
