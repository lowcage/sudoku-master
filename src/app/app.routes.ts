import { Routes, provideRouter, withRouterConfig } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'playground', component: PlaygroundComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export const appRouterProviders = [
  provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' }))
];
