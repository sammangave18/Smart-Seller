import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  @Input() pageTitle = '';

  constructor(private router: Router,  private sessionService: SessionService) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToSellers() {
    this.router.navigate(['/seller']);
  }

  logout() {
    this.sessionService.logout();
  }
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
