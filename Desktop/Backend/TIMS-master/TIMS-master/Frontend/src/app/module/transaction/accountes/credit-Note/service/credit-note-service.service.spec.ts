import { TestBed } from '@angular/core/testing';

import { CreditNoteServiceService } from './credit-note-service.service';

describe('CreditNoteServiceService', () => {
  let service: CreditNoteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditNoteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
