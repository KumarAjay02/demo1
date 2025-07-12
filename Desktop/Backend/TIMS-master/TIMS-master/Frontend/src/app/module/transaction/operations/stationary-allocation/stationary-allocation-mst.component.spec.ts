import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationaryAllocationMstComponent } from './stationary-allocation-mst.component';

describe('StationaryAllocationMstComponent', () => {
  let component: StationaryAllocationMstComponent;
  let fixture: ComponentFixture<StationaryAllocationMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationaryAllocationMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationaryAllocationMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
