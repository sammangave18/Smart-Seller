// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Dashboard } from './components/dashboard/dashboard';
// import { Login } from './components/login/login';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, Login, Dashboard], // Add component here to import
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('smart-seller-ui');
// }

import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { SessionService } from './services/session-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  protected readonly title = signal('smart-seller-ui');

  constructor(
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.sessionService.startSessionTimer();
    }

  }

}
