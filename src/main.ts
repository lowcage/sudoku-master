import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';
import {provideIndexedDb, DBConfig } from 'ngx-indexed-db';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

const dbConfig: DBConfig = {
  name: 'SudokuDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'games',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'email', keypath: 'email', options: { unique: false } },
        { name: 'board', keypath: 'board', options: { unique: false } },
        { name: 'won', keypath: 'won', options: { unique: false } }
      ]
    }
  ]
};

bootstrapApplication(AppComponent, {
  providers: [
    provideIndexedDb(dbConfig),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
}).catch(err => console.error(err));
