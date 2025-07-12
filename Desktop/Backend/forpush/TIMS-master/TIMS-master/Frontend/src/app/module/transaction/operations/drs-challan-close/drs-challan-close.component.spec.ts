import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrsChallanCloseComponent } from './drs-challan-close.component';

describe('DrsChallanCloseComponent', () => {
  let component: DrsChallanCloseComponent;
  let fixture: ComponentFixture<DrsChallanCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrsChallanCloseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrsChallanCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
