import { TestBed } from '@angular/core/testing';

import { MaterialmstServiceService } from './materialmst-service.service';

describe('MaterialmstServiceService', () => {
  let service: MaterialmstServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialmstServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
