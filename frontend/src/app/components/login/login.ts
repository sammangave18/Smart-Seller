import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';

  constructor(private authService: Auth, private router: Router,
    private sessionService: SessionService) {}

  login() {
    console.log('LOGIN CLICKED');

    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {

        // For user name
        console.log('LOGIN SUCCESS', response);
        const admin = response.user || {
          username: this.username,
        };
        localStorage.setItem('currentAdmin', JSON.stringify(admin));

        console.log('NAVIGATING NOW');

        // for login
        localStorage.setItem('token', response.access_token);
        this.sessionService.startSessionTimer();
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.log('LOGIN ERROR', error); // 👈 VERY IMPORTANT
        alert('Login failed');
      },
    });
  }
}
