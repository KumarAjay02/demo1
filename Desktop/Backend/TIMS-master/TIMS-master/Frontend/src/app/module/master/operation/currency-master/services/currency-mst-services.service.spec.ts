import { TestBed } from '@angular/core/testing';

import { CurrencyMstServicesService } from './currency-mst-services.service';

describe('CurrencyMstServicesService', () => {
  let service: CurrencyMstServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyMstServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
