import { TestBed } from '@angular/core/testing';

import { CostCenterMstServiceService } from './cost-center-mst-service.service';

describe('CostCenterMstServiceService', () => {
  let service: CostCenterMstServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostCenterMstServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
