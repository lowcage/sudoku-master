import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus = this.isAuthenticated.asObservable();

  constructor() {}

  login(email: string, password: string) {
    console.log(`User logged in: ${email}`);
    this.isAuthenticated.next(true);
  }

  register(email: string, password: string) {
    console.log(`User registered: ${email}`);
    this.isAuthenticated.next(true);
  }

  logout() {
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }
}
