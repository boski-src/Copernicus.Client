import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TopPlayersComponent } from './top-players/top-players.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreGamesComponent } from './explore-games/explore-games.component';

@NgModule({
  declarations: [HomeComponent, AboutUsComponent, TopPlayersComponent, ExploreGamesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule {}
