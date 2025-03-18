import { TestBed } from '@angular/core/testing';

import { ScoreserviceService } from './scoreservice.service';

describe('ScoreserviceService', () => {
  let service: ScoreserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
