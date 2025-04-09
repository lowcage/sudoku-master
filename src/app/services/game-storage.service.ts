import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

export interface SavedGame {
  id?: number;
  email: string;
  board: string[][];
  won: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {
  constructor(private dbService: NgxIndexedDBService) {}

  saveGame(board: string[][]) {
    const game: SavedGame = {
      email: sessionStorage.getItem('userEmail') || 'anonymous',
      board,
      won: false
    };
    return this.dbService.add('games', game);
  }

  getLastGame() {
    return this.dbService.getAll<SavedGame>('games');
  }

  deleteAllGames() {
    return this.dbService.clear('games');
  }

  overwriteGame(board: string[][]) {
    return this.deleteAllGames().subscribe({
      next: () => {
        this.saveGame(board).subscribe();
      },
      error: err => console.error('Delete failed', err)
    });
  }
}
