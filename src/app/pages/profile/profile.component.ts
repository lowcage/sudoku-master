import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  displayedColumns: string[] = ['email', 'gamesPlayed', 'gamesWon'];
  userData = [
    {
      email: sessionStorage.getItem('userEmail') || 'No email',
      gamesPlayed: sessionStorage.getItem('gamesPlayed') || '0',
      gamesWon: sessionStorage.getItem('gamesWon') || '0'
    }
  ];
}
