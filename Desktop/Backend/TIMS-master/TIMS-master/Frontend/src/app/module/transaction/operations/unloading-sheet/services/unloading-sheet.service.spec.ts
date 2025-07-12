import { TestBed } from '@angular/core/testing';

import { UnloadingSheetService } from './unloading-sheet.service';

describe('UnloadingSheetService', () => {
  let service: UnloadingSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnloadingSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
