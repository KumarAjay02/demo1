import { TestBed } from '@angular/core/testing';

import { BranchmstService } from './branchmst.service';

describe('BranchmstService', () => {
  let service: BranchmstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchmstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
