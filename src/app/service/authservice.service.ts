import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 

  private apiUrl = `${environment.baseURL}/auth`;

  constructor(private http: HttpClient) { }
  
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getUsers(params:any): Observable<any>{
    return this.http.get(`${this.apiUrl}/users`, {params});
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/users/${userId}`).pipe(
      tap(() => {
        // Delete user-related data
        this.http.delete(`/api/score/${userId}`).subscribe();
        this.http.delete(`/api/test-status/${userId}`).subscribe();
      })
    );
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        if (response.user && response.token) {
          localStorage.setItem('user', JSON.stringify(response.user)); // Store user details
          localStorage.setItem('token', response.token); // Store token
        }
      })
    );
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }
  
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserScores(userId: string) {
    return this.http.get<{ data: any }>(`http://localhost:4000/api/score/${userId}`);
  }
  

  logoutUser() {
    // ✅ Remove user session data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // If stored separately
  
    // ✅ Redirect user to login page
    window.location.href = '/login';  // Ensures a full refresh after logout
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

}
