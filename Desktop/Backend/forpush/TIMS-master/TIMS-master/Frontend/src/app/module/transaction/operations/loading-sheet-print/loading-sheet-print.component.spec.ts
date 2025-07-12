import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSheetPrintComponent } from './loading-sheet-print.component';

describe('LoadingSheetPrintComponent', () => {
  let component: LoadingSheetPrintComponent;
  let fixture: ComponentFixture<LoadingSheetPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSheetPrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSheetPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
