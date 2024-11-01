import { Routes } from '@angular/router';
import { AuthResolver } from './resolvers/auth.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(m => m.PlayerModule),
    resolve: {
      isUserAuthenticated: AuthResolver
    }
  }
];
