import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButton} from '@angular/material/button';
import {GameStorageService, SavedGame} from '../../services/game-storage.service';


@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  board: string[][] = Array.from({ length: 9 }, () => Array(9).fill(''));
  selectedRow: number | null = null;
  selectedCol: number | null = null;
  showBoard = false;
  hasSavedGame = false;


  constructor(private gameStorage: GameStorageService) {
    // Check if a saved game exists
    this.gameStorage.getLastGame().subscribe(games => {
      this.hasSavedGame = games.length > 0;
    });
  }


  easyBoard: string[][] = [
    ['5', '3', '',  '', '7', '',  '', '', ''],
    ['6', '', '',  '1', '9', '5', '', '', ''],
    ['', '9', '8', '', '', '',  '', '6', ''],
    ['8', '', '',  '', '6', '',  '', '', '3'],
    ['4', '', '',  '8', '', '3', '', '', '1'],
    ['7', '', '',  '', '2', '',  '', '', '6'],
    ['', '6', '',  '', '', '',  '2', '8', ''],
    ['', '', '',  '4', '1', '9', '', '', '5'],
    ['', '', '',  '', '8', '',  '', '7', '9']
  ];

  loadEasyBoard() {
    this.board = this.easyBoard.map(row => [...row]);
    this.selectedRow = null;
    this.selectedCol = null;
    this.showBoard = true;

    // Elmentjük az indított játékot
    this.gameStorage.saveGame(this.board).subscribe({
      next: () => console.log('Game saved to IndexedDB'),
      error: (err) => console.error('Failed to save game:', err)
    });
  }

  loadLastGame() {
    this.gameStorage.getLastGame().subscribe((games: SavedGame[]) => {
      const lastGame = games[games.length - 1];
      if (lastGame && lastGame.board) {
        this.board = lastGame.board;
        this.selectedRow = null;
        this.selectedCol = null;
        this.showBoard = true;
      }
    });

  }




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

    this.gameStorage.overwriteGame(this.board);
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
