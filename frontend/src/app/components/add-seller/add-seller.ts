import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../../services/seller';
import { Layout } from '../layout/layout';


@Component({
  selector: 'app-add-seller',
  standalone: true,
  imports: [FormsModule,Layout],
  templateUrl: './add-seller.html',
  styleUrl: './add-seller.css',
})
export class AddSeller {
  username = '';
  email = '';
  password = '';

  constructor(private sellerService: SellerService, private router: Router) {}
  saveSeller() {
    const sellerData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.sellerService.addSeller(sellerData).subscribe({
      next: (response) => {
        console.log(response);
        alert('Seller Added Successfully');
        this.router.navigate(['/seller']);
      },

      error: (error) => {
        console.log(error);
        alert('Failed To Add Seller');
      },
    });
  }

}
