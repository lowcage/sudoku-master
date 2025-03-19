import { Component } from '@angular/core';
import {NavigationExtras, Router, RouterOutlet} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AuthService} from './services/auth.service';
import {MaterialModule} from './material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MaterialModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sudoku-master';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  navigateTo(route: string) {
    const navigationExtras: NavigationExtras = { skipLocationChange: true };
    this.router.navigate([route], navigationExtras);
  }

  logout() {
    this.authService.logout();
    this.navigateTo('/auth')
  }

}
