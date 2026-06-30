import { Component,  OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Layout } from '../layout/layout';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule,Layout],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})

export class EditProduct implements OnInit {
  id = 0;

  name = '';
  description = '';
  price = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product Id:', this.id);
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProductById(this.id).subscribe({
      next: (response: any) => {
        console.log(response);

        this.name = response.name;
        this.description = response.description;
        this.price = response.price;
        this.cdr.detectChanges();

      },

      error: (error) => {
        console.log(error);
      },
    });
  }
  updateProduct() {
    const productData = {
      name: this.name,
      description: this.description,
      price: this.price,
    };

    this.productService.updateProduct(this.id, productData).subscribe({
      next: (response) => {
        console.log(response);
        alert('Product Updated');
        this.router.navigate(['/products']);
      },

      error: (error) => {
        console.log(error);
        alert('Update Failed');
      },
    });
  }
}
