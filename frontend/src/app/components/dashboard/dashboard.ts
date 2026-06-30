import { Component, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { SellerService } from '../../services/seller';
import { Layout } from '../layout/layout';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import { DashboardService } from '../../services/dashboard';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Layout],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {
  currentAdmin: any;
  totalProducts = 0;
  totalSellers = 0;
  constructor(
    private router: Router,
    private productService: ProductService,
    private sellerService: SellerService,
    private cdr: ChangeDetectorRef,
    private dashboardService: DashboardService
  ) {}

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToSellers() {
    this.router.navigate(['/seller']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    const adminData = localStorage.getItem('currentAdmin');

    this.currentAdmin = adminData && adminData !== 'undefined' ? JSON.parse(adminData) : null;

    console.log('ADMIN:', this.currentAdmin);
    this.loadProducts();
    this.loadSellers();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.totalProducts = res.length; // IMPORTANT
        console.log(res.length);
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err),
    });
  }
  ngAfterViewInit(): void {
    this.loadRevenueChart();
  }

  loadSellers() {
    this.sellerService.getSeller().subscribe({
      next: (res: any) => {
        this.totalSellers = res.length; // IMPORTANT
        console.log(res.length);
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err),
    });
  }
  private chart: Chart | undefined;

  loadRevenueChart() {
    const data = this.dashboardService.getRevenueData();

    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    console.log(canvas)
    if (!canvas) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {
      type: 'line',

      data: {
        labels: data.labels,

        datasets: [
          {
            label: 'Revenue',

            data: data.revenue,

            borderColor: '#2563eb',

            backgroundColor: 'rgba(37,99,235,.15)',

            fill: true,

            tension: 0.4,
          },
        ],
      },

      options: {
        responsive: true,
      },
    });
  }
}
