
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { SpotifyService } from "../services/spotify.service";

export const AuthResolver = () => new Promise(async (res, rej) => {
  const spotifyService = inject(SpotifyService);
  const router = inject(Router);

  const notAuthenticated = (): boolean => {
    localStorage.clear();
    router.navigateByUrl('/login');
    rej('USUARIO NAO AUTENTICADO!')
    return false;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    return notAuthenticated();
  }

  const user = await spotifyService.initializeUser();

  if (user) res(true);
  else res(notAuthenticated());

  return false;
})
