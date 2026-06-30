import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from '../../../../node_modules/rxjs/dist/types/index';
import { ProductService } from '../../services/product';
import { Layout } from '../layout/layout';
import { AiService } from '../../services/ai';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, Layout],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  name = '';
  description = '';
  price = 0;
  isGenerating = false;
  constructor(
    private productService: ProductService,
    private router: Router,
    private aiService: AiService,
    private cdr: ChangeDetectorRef
  ) {}

  saveProduct() {
    const productData = {
      name: this.name,
      description: this.description,
      price: this.price,
    };

    this.productService.addProduct(productData).subscribe({
      next: (response) => {
        console.log(response);
        alert('Product Added Successfully');
        this.router.navigate(['/products']);
      },

      error: (error) => {
        console.log(error);
        alert('Failed To Add Product');
      },
    });
  }
  generateDescription() {
    const request = {
      name: this.name,
      category: 'General',
      price: this.price,
    };
    this.isGenerating = true;

    this.aiService.generateDescription(request).subscribe({
      next: (response: any) => {
        console.log('AI Response:', response);

        console.log('Description:', response.description);
    this.isGenerating = false ;

        this.description = response.description;
        console.log('Component Description:', this.description);
        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.log(error);

        alert('AI Generation Failed');
      },
    });
  }
}
