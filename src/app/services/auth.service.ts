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
    sessionStorage.setItem('userEmail', email); // Email mentése sessionStorage-be
    sessionStorage.setItem('gamesPlayed', '0'); // Alapértékek
    sessionStorage.setItem('gamesWon', '0');
    this.isAuthenticated.next(true);
  }

  register(email: string, password: string) {
    console.log(`User registered: ${email}`);
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('gamesPlayed', '0');
    sessionStorage.setItem('gamesWon', '0');
    this.isAuthenticated.next(true);
  }

  logout() {
    sessionStorage.clear(); // Kilépéskor töröljük az adatokat
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }
}
