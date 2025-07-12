import { TestBed } from '@angular/core/testing';

import { FinancialyearopeaningService } from './financialyearopeaning.service';

describe('FinancialyearopeaningService', () => {
  let service: FinancialyearopeaningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialyearopeaningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
