import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrsplanningsheetComponent } from './drsplanningsheet.component';

describe('DrsplanningsheetComponent', () => {
  let component: DrsplanningsheetComponent;
  let fixture: ComponentFixture<DrsplanningsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrsplanningsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrsplanningsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
