import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceModemstComponent } from './service-modemst.component';

describe('ServiceModemstComponent', () => {
  let component: ServiceModemstComponent;
  let fixture: ComponentFixture<ServiceModemstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceModemstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceModemstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
