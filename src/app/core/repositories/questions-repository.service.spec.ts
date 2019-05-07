import { TestBed } from '@angular/core/testing';

import { QuestionsRepositoryService } from './questions-repository.service';

describe('QuestionsRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionsRepositoryService = TestBed.get(QuestionsRepositoryService);
    expect(service).toBeTruthy();
  });
});
