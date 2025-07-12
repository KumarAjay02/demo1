import { TestBed } from '@angular/core/testing';

import { PantaxserviceService } from './pantaxservice.service';

describe('PantaxserviceService', () => {
  let service: PantaxserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PantaxserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
