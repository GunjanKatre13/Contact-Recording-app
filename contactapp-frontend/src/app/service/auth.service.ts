import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: string, userId: number }>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        if (response.token && response.userId) {
          this.storeToken(response.token);
          localStorage.setItem('userId', response.userId.toString());
          this.isAuthenticated = true;
        }
      })
    );
  }  


  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
}
