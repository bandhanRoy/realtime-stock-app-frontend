import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  stockEmitter: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(`${environment.url}/user/login`, data);
  }

  logout() {
    const headers = { Authorization: localStorage.getItem('token') };
    return this.http.patch(`${environment.url}/user/logout`, {}, { headers: this.token });
  }

  register(data) {
    return this.http.post(`${environment.url}/user/register`, data);
  }

  getUserHistory() {
    const headers = { Authorization: localStorage.getItem('token') };
    return this.http.get(`${environment.url}/stock/history`, { headers: this.token });
  }

  fetchCurrentStock(data) {
    const headers = { Authorization: localStorage.getItem('token') };
    return this.http.post(`${environment.url}/stock/current`, data, { headers: this.token });
  }

  fetchGraphHistory(stockId) {
    return this.http.get(`${environment.url}/stock/previous?stockId=${stockId}`, { headers: this.token });
  }

  get token() {
    return { Authorization: localStorage.getItem('token') }
  }
}
