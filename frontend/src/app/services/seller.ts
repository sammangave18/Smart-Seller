import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seller } from '../components/seller/seller';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getSeller() {
    const token = localStorage.getItem('token');

    console.log('JWT Token:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl + '/seller', { headers });
  }

  deleteSeller(id: number) {
    return this.http.delete(this.apiUrl + '/seller/' + id);
  }

  addSeller(seller: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post(this.apiUrl + '/seller', seller, { headers });
  }
  getSellerById(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get(this.apiUrl + '/seller/' + id, { headers });
  }

  updateSeller(id: number, seller: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.put(this.apiUrl + '/seller/' + id, seller, { headers });
  }
}
