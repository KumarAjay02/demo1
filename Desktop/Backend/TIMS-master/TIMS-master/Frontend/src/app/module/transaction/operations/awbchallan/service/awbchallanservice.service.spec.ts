import { TestBed } from '@angular/core/testing';

import { AwbchallanserviceService } from './awbchallanservice.service';

describe('AwbchallanserviceService', () => {
  let service: AwbchallanserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwbchallanserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
