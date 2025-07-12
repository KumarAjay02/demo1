import { TestBed } from '@angular/core/testing';

import { VendorvehicleratemstService } from './vendorvehicleratemst.service';

describe('VendorvehicleratemstService', () => {
  let service: VendorvehicleratemstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorvehicleratemstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
