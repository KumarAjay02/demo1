import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketVehicleRequestFormComponent } from './market-vehicle-request-form.component';

describe('MarketVehicleRequestFormComponent', () => {
  let component: MarketVehicleRequestFormComponent;
  let fixture: ComponentFixture<MarketVehicleRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketVehicleRequestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketVehicleRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
