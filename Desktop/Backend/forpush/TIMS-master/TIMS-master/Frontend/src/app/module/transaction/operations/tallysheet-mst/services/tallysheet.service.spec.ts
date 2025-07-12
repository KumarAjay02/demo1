import { TestBed } from '@angular/core/testing';

import { TallysheetService } from './tallysheet.service';

describe('TallysheetService', () => {
  let service: TallysheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TallysheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
