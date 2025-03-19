import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  board: string[][] = Array.from({ length: 9 }, () => Array(9).fill(''));
  selectedRow: number | null = null;
  selectedCol: number | null = null;

  selectCell(row: number, col: number) {
    this.selectedRow = row;
    this.selectedCol = col;
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.selectedRow === null || this.selectedCol === null) return;

    const key = event.key;

    if (key >= '1' && key <= '9') {
      this.board[this.selectedRow][this.selectedCol] = key;
    } else if (key === 'Backspace' || key === 'Delete' || key == '0') {
      this.board[this.selectedRow][this.selectedCol] = '';
    } else {
      switch (key) {
        case 'ArrowUp':
          if (this.selectedRow > 0) {
            this.selectedRow--;
          } else {
            this.selectedRow = 8;
          }
          break;
        case 'ArrowDown':
          if (this.selectedRow < 8) {
            this.selectedRow++;
          } else {
            this.selectedRow = 0;
          }
          break;
        case 'ArrowLeft':
          if (this.selectedCol > 0) {
            this.selectedCol--;
          } else {
            this.selectedCol = 8;
          }
          break;
        case 'ArrowRight':
          if (this.selectedCol < 8) {
            this.selectedCol++;
          } else {
            this.selectedCol = 0
          }
          break;
        default:
          return;
      }
    }

    event.preventDefault(); // Megakadályozza az alapértelmezett görgetést
  }

  isNumberInvalid(row: number, col: number, num: string): boolean {
    if (!num) return false; // Ha a cella üres, akkor nem invalid

    for (let i = 0; i < 9; i++) {
      if ((i !== col && this.board[row][i] === num) || (i !== row && this.board[i][col] === num)) {
        return true;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const checkRow = startRow + i;
        const checkCol = startCol + j;
        if ((checkRow !== row || checkCol !== col) && this.board[checkRow][checkCol] === num) {
          return true;
        }
      }
    }

    return false;
  }
}
