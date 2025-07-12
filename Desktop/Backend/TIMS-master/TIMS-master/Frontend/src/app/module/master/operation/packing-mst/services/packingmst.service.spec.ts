import { TestBed } from '@angular/core/testing';

import { PackingmstService } from './packingmst.service';

describe('PackingmstService', () => {
  let service: PackingmstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackingmstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
