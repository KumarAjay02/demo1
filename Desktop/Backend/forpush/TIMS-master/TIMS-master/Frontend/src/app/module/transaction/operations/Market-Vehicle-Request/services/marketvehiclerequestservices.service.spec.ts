import { TestBed } from '@angular/core/testing';

import { MarketvehiclerequestservicesService } from './marketvehiclerequestservices.service';

describe('MarketvehiclerequestservicesService', () => {
  let service: MarketvehiclerequestservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketvehiclerequestservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
