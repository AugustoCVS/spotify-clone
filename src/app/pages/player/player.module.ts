import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlayerComponent } from "./player.component";
import { RouterModule } from "@angular/router";
import { playerRoutes } from "./player.routes";
import { LeftPanellComponent } from "../../components/left-panell/left-panell.component";

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanellComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(playerRoutes)
  ],
})
export class PlayerModule { }