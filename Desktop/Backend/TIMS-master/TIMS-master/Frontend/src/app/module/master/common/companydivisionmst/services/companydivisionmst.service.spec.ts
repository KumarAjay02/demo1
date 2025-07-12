import { TestBed } from '@angular/core/testing';

import { CompanydivisionmstService } from './companydivisionmst.service';

describe('CompanydivisionmstService', () => {
  let service: CompanydivisionmstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanydivisionmstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
