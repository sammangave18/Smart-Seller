import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../services/seller';
import { Layout } from '../layout/layout';

@Component({
  selector: 'app-edit-seller',
  standalone: true,
  imports: [FormsModule,Layout],
  templateUrl: './edit-seller.html',
  styleUrl: './edit-seller.css',
})
export class EditSeller implements OnInit {
  id = 0;

  username = '';
  email = '';
  password = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sellerService: SellerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Seller Id:', this.id);

    this.loadSeller();
  }

  loadSeller() {
    this.sellerService.getSellerById(this.id).subscribe({
      next: (response: any) => {
        console.log(response);

        this.username = response.username;
        this.email = response.email;
        this.cdr.detectChanges();

        // Password intentionally left blank
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  updateSeller() {
    const sellerData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.sellerService.updateSeller(this.id, sellerData).subscribe({
      next: (response) => {
        console.log(response);
        alert('Seller Updated Successfully');
        this.router.navigate(['/seller']);
      },
      error: (error) => {
        console.log(error);
        alert('Update Failed');
      },
    });
  }
}
