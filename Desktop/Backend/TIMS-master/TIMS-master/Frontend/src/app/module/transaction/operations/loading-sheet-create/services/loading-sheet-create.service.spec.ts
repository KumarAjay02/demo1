import { TestBed } from '@angular/core/testing';

import { LoadingSheetCreateService } from './loading-sheet-create.service';

describe('LoadingSheetCreateService', () => {
  let service: LoadingSheetCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingSheetCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
