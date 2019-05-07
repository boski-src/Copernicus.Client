import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { CreatePartyComponent } from './create-party/create-party.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { RoundComponent } from './round/round.component';
import { JoinComponent } from './join/join.component';
import { WaitingSceneComponent } from './round/waiting-scene/waiting-scene.component';
import { GameSignalRService } from './game-signalr.service';
import { StartedSceneComponent } from './round/started-scene/started-scene.component';
import { EndedSceneComponent } from './round/ended-scene/ended-scene.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [GameComponent, CreatePartyComponent, RoundComponent, JoinComponent, WaitingSceneComponent, StartedSceneComponent, EndedSceneComponent],
  imports: [
    GameRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxChartsModule
  ],
  providers: [
    GameSignalRService
  ]
})
export class GameModule { }
