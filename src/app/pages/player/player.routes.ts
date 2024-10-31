import { Routes } from "@angular/router";
import { PlayerComponent } from "./player.component";
import { HomeComponent } from "../home/home.component";
import { MusicsListComponent } from "../musics-list/musics-list.component";

export const playerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'list',
        component: MusicsListComponent
      }
    ]
  }
]