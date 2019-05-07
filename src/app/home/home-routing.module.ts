import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TopPlayersComponent } from './top-players/top-players.component';
import { ExploreGamesComponent } from './explore-games/explore-games.component';

const routes : Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: AboutUsComponent
      },
      {
        path: 'top-players',
        component: TopPlayersComponent
      },
      {
        path: 'explore',
        component: ExploreGamesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
