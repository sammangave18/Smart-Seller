import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getProducts() {
    const token = localStorage.getItem('token');

    console.log('JWT Token:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl + '/product', { headers });
  }
  addProduct(product: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post(this.apiUrl + '/product', product, { headers });
  }
  deleteProduct(id: number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.apiUrl}/product/${id}`, { headers });
  }

  getProductById(id: number) {
    const token = localStorage.getItem('token');

    return this.http.get(this.apiUrl + '/product/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateProduct(id: number, product: any) {
    const token = localStorage.getItem('token');

    return this.http.put(this.apiUrl + '/product/' + id, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
