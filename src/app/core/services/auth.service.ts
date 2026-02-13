import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  
  //Mantener el estado del token reactivamente
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() { 
    //Verificar si hay token guardado
    const token = this.getToken();
    const user = this.getUser();
    if(token) {
        this.currentUserSubject.next({ token, user }); 
    }
  }

  //Auth Actions

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.success && response.token) {
          this.setToken(response.token);
          this.setUser(response.user);
          this.currentUserSubject.next({ token: response.token, user: response.user });
        }
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
    this.currentUserSubject.next(null);
  }

  //Token Management

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  //User Management
  setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): any | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }


  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
