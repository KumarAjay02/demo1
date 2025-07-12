import { TestBed } from '@angular/core/testing';

import { CardrateserviceService } from './cardrateservice.service';

describe('CardrateserviceService', () => {
  let service: CardrateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardrateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
