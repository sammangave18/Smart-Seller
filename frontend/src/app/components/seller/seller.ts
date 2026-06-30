import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerService } from '../../services/seller';
import { Router } from '@angular/router';
import { Layout } from '../layout/layout';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [CommonModule, Layout],
  templateUrl: './seller.html',
  styleUrl: './seller.css',
})
export class Seller implements OnInit {
  seller: any[] = [];

  constructor(
    private sellerService: SellerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Stored Token:', localStorage.getItem('token'));

    this.sellerService.getSeller().subscribe({
      next: (response: any) => {
        console.log(response);
        // this.seller = response;
        this.seller = [...response];
        console.log('Seller Array:', this.seller);
        console.log('Length:', this.seller.length);
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
  goToAddSeller() {
    this.router.navigate(['/add-seller']);
  }

  toEditSeller(id: number) {
    this.router.navigate(['/edit-seller', id]);
  }

  toDeleteSeller(id: number) {
    const confirmDelete = confirm('Are you sure?');

    if (confirmDelete) {
      this.sellerService.deleteSeller(id).subscribe({
        next: () => {
          this.seller = this.seller.filter((s) => s.id !== id);
          alert('Seller Deleted successfully');
        },
        error: (err) => {
          console.log(err);
          alert('Seller Delete failed');
        },
      });
    }
  }
}
