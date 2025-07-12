import { TestBed } from '@angular/core/testing';

import { DebitNoteServiceService } from './debit-note-service.service';

describe('DebitNoteServiceService', () => {
  let service: DebitNoteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitNoteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
