import { TestBed } from '@angular/core/testing';

import { MarketvehicleapprovalservicesService } from './marketvehicleapprovalservices.service';

describe('MarketvehicleapprovalservicesService', () => {
  let service: MarketvehicleapprovalservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketvehicleapprovalservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
