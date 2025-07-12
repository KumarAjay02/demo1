import { TestBed } from '@angular/core/testing';

import { CompanymstService } from './companymst.service';

describe('CompanymstService', () => {
  let service: CompanymstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanymstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
