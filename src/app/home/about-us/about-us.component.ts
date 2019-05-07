import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private sessionService : SessionService) { }

  public get isLogged() : boolean {
    return this.sessionService.isLogged;
  }

  ngOnInit() {
  }

}
