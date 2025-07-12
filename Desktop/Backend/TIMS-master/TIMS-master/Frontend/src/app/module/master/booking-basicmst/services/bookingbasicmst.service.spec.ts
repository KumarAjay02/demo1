import { TestBed } from '@angular/core/testing';

import { BookingbasicmstService } from './bookingbasicmst.service';

describe('BookingbasicmstService', () => {
  let service: BookingbasicmstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingbasicmstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
