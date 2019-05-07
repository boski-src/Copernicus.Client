import { TestBed } from '@angular/core/testing';

import { PlayersRepositoryService } from './players-repository.service';

describe('PlayersRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayersRepositoryService = TestBed.get(PlayersRepositoryService);
    expect(service).toBeTruthy();
  });
});
