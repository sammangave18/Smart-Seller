import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  apiUrl = 'https://smartseller-backend-samarth-ecg7hfhecraxbqgk.centralindia-01.azurewebsites.net'; // Instead of hardcoding URLs everywhere.
  constructor(private http: HttpClient) {}
  testApi() {
    return this.http.get(this.apiUrl + '/test'); //Observables for API communication.
  }

  login(username: string, password: string) {

    const formData = new FormData();
  
    formData.append('username', username);
    formData.append('password', password);
  
    return this.http.post(
      this.apiUrl + '/login',
      formData
    );
  }
}
