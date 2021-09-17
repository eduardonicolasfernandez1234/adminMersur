import { TestBed } from '@angular/core/testing';

import { SwallAlertService } from './swall-alert.service';

describe('SwallAlertService', () => {
  let service: SwallAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwallAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
