import { Component, OnInit } from '@angular/core';
import { SessionService } from '../core/services/session.service';
import { Account } from '../core/models/account/account.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private sessionService : SessionService) { }

  public get me() : Account {
    return this.sessionService.me;
  }

  ngOnInit() {
  }

}
