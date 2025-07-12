import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCapacityMasterComponent } from './vehicle-capacity-master.component';

describe('VehicleCapacityMasterComponent', () => {
  let component: VehicleCapacityMasterComponent;
  let fixture: ComponentFixture<VehicleCapacityMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCapacityMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCapacityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
