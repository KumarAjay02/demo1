import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMasterFormComponent } from './vehicle-master-form.component';

describe('VehicleMasterFormComponent', () => {
  let component: VehicleMasterFormComponent;
  let fixture: ComponentFixture<VehicleMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleMasterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
