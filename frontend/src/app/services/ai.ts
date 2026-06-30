import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  apiUrl = 'http://127.0.0.1:8000';

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