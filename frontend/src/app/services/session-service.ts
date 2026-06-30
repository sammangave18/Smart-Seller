import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class SessionService {
  private readonly SESSION_TIME = 30 * 60 * 1000; // 30 Minutes

  private timer: any;

  constructor(private router: Router) {}

  startSessionTimer() {
    // Save Login Time
    if (!localStorage.getItem('loginTime')) {
      localStorage.setItem('loginTime', Date.now().toString());
    }

    // Prevent Multiple Timers
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      const loginTime = Number(localStorage.getItem('loginTime'));

      if (!loginTime) {
        return;
      }

      const currentTime = Date.now();
      // console.log(this.timer)
      // console.log(this.SESSION_TIME)
      if (currentTime - loginTime >= this.SESSION_TIME) {
        alert('Session Expired. Please Login Again.');
        
        this.logout();
      }
    }, 1000);
  }

  logout() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');

    this.router.navigate(['/']);
  }
}
