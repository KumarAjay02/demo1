import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetSalarytPaymentComponent } from './net-salaryt-payment.component';

describe('NetSalarytPaymentComponent', () => {
  let component: NetSalarytPaymentComponent;
  let fixture: ComponentFixture<NetSalarytPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetSalarytPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetSalarytPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
