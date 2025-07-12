import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketVehicleApprovalFormComponent } from './market-vehicle-approval-form.component';

describe('MarketVehicleApprovalFormComponent', () => {
  let component: MarketVehicleApprovalFormComponent;
  let fixture: ComponentFixture<MarketVehicleApprovalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketVehicleApprovalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketVehicleApprovalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
