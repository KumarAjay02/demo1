import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSheetCreateComponent } from './loading-sheet-create.component';

describe('LoadingSheetCreateComponent', () => {
  let component: LoadingSheetCreateComponent;
  let fixture: ComponentFixture<LoadingSheetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSheetCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSheetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
