import { TestBed } from '@angular/core/testing';

import { GamesRepositoryService } from './games-repository.service';

describe('GamesRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesRepositoryService = TestBed.get(GamesRepositoryService);
    expect(service).toBeTruthy();
  });
});
