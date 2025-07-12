import { TestBed } from '@angular/core/testing';

import { ServicemodemstService } from './servicemodemst.service';

describe('ServicemodemstService', () => {
  let service: ServicemodemstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicemodemstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
