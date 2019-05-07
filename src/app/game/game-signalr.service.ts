import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameSignalRService {

  private hubConnection : signalR.HubConnection;
  private status : boolean = false;
  private currentGameId : string = '';

  constructor () {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalRGameHub)
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('Connection started');
        this.status = true;
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public get isConnectedToGame () : boolean {
    return this.currentGameId != '';
  }

  public get hub () {
    return this.hubConnection;
  }

  public joinToGame (id : string) {
    if (this.currentGameId) this.leaveFromGame(id);

    this.hubConnection.invoke('JoinToGame', id)
      .then(() => this.currentGameId = id)
      .catch(() => setTimeout(() => this.joinToGame(id), 1000));
  }

  public leaveFromGame(id : string) {
    this.hubConnection.invoke('LeaveFromGame', id)
      .then(() => this.currentGameId = '');
  }

}
