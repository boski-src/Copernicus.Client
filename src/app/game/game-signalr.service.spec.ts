import { TestBed } from '@angular/core/testing';

import { GameSignalRService } from './game-signalr.service';

describe('GameSignalRService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameSignalRService = TestBed.get(GameSignalRService);
    expect(service).toBeTruthy();
  });
});
