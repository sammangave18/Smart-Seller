import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  apiUrl = 'smartseller-backend-samarth-ecg7hfhecraxbqgk.centralindia-01.azurewebsites.net';

  constructor(private http: HttpClient) {}

  generateDescription(data: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      this.apiUrl + '/generate-description',
      data,
      { headers }
    );
  }
}