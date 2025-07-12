import { TestBed } from '@angular/core/testing';

import { GstratemstService } from './gstratemst.service';

describe('GstratemstService', () => {
  let service: GstratemstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstratemstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
