import { TestBed } from '@angular/core/testing';

import { LoadingsheetPrintService } from './loadingsheet-print.service';

describe('LoadingsheetPrintService', () => {
  let service: LoadingsheetPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingsheetPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
