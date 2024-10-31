import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PlayerComponent } from "./player.component";
import { playerRoutes } from "./player.routes";
import { LeftPanellComponent } from "../../components/left-panell/left-panell.component";
import { MenuButtonComponent } from "../../components/menu-button/menu-button.component";
import { UserFooterComponent } from "../../components/user-footer/user-footer.component";
import { HomeComponent } from "../home/home.component";
import { TopArtistComponent } from "../../components/top-artist/top-artist.component";
import { RightPanellComponent } from "../../components/right-panell/right-panell.component";
import { RecentSearchesComponent } from "../../components/recent-searches/recent-searches.component";

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanellComponent,
    MenuButtonComponent,
    UserFooterComponent,
    HomeComponent,
    TopArtistComponent,
    RightPanellComponent,
    RecentSearchesComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(playerRoutes),
    FormsModule,
  ],
})
export class PlayerModule { }