import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketVehicleRequestComponent } from './market-vehicle-request.component';

describe('MarketVehicleRequestComponent', () => {
  let component: MarketVehicleRequestComponent;
  let fixture: ComponentFixture<MarketVehicleRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketVehicleRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketVehicleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
