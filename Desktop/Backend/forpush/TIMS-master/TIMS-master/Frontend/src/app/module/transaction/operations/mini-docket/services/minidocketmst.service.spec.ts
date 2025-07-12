import { TestBed } from '@angular/core/testing';

import { MinidocketmstService } from './minidocketmst.service';

describe('MinidocketmstService', () => {
  let service: MinidocketmstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinidocketmstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
