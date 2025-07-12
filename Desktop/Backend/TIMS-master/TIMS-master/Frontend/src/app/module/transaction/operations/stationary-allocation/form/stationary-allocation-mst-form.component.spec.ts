import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationaryAllocationMstFormComponent } from './stationary-allocation-mst-form.component';

describe('StationaryAllocationMstFormComponent', () => {
  let component: StationaryAllocationMstFormComponent;
  let fixture: ComponentFixture<StationaryAllocationMstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationaryAllocationMstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationaryAllocationMstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
