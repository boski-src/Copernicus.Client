import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { CreatePartyComponent } from './create-party/create-party.component';
import { RoundComponent } from './round/round.component';
import { JoinComponent } from './join/join.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes : Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        canLoad: [AuthGuard],
        path: 'create',
        component: CreatePartyComponent
      },
      {
        canLoad: [AuthGuard],
        path: ':id',
        component: RoundComponent,
      },
      {
        path: ':id/join',
        component: JoinComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
