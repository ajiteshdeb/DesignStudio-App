import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from '../../node_modules/rxjs';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { UserProfile } from './interfaces/user-profile.interface';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public appPagesLogin = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Logout',
      url: '/home',
      icon: 'log-out'
    }
  ];

  public appPagesLogout = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    }
  ];

  private subs: Subscription[] = [];
  userprofile: UserProfile;
  isLoggedIn = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
    this.authService
        .isLoggedIn()
        .pipe(
          filter(wpUser => wpUser !== null),
          switchMap(wpUser => this.authService.getUserProfile(wpUser.user_id))
        )
        .subscribe(res => {
              this.isLoggedIn = true;
              this.authService.userProfileSub.next(res);
        });

    this.authService
        .isLoggedIn()
        .pipe( filter(wpUser => wpUser === null) )
        .subscribe(res => {
              this.isLoggedIn = false;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.subs.push(
      this.authService.userProfile$.subscribe( userprofile => {
        this.userprofile = userprofile;
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  openPage(page) {
    if (page === 'Logout') {
      this.authService.logout();
    }
  }
}

