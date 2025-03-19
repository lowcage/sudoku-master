import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatTooltip, NgOptimizedImage],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  email = '';
  password = '';
  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.email, this.password);
    } else {
      this.authService.register(this.email, this.password);
    }
    this.router.navigate(['/playground'], { skipLocationChange: true });
  }
}
