import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketVehicleApprovalComponent } from './market-vehicle-approval.component';

describe('MarketVehicleApprovalComponent', () => {
  let component: MarketVehicleApprovalComponent;
  let fixture: ComponentFixture<MarketVehicleApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketVehicleApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketVehicleApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
