import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Router } from '@angular/router';
import { Layout } from '../layout/layout';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, Layout],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Stored Token:', localStorage.getItem('token'));

    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response);
        // this.products = response;
        this.products = [...response];
        console.log('Products Array:', this.products);
        console.log('Length:', this.products.length);
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  toEditProduct(id: number) {
    this.router.navigate(['/edit-product', id]);
  }

  toDeleteProduct(id: number) {
    const confirmDelete = confirm('Are you sure?');

    if (confirmDelete) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((p) => p.id !== id);
          alert('Deleted successfully');
        },
        error: (err) => {
          console.log(err);
          alert('Delete failed');
        },
      });
    }
  }
}
