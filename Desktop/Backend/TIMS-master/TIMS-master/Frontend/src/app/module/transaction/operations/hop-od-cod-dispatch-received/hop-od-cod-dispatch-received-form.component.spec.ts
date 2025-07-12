import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopOdCodDispatchReceivedFormComponent } from './hop-od-cod-dispatch-received-form.component';

describe('HopOdCodDispatchReceivedFormComponent', () => {
  let component: HopOdCodDispatchReceivedFormComponent;
  let fixture: ComponentFixture<HopOdCodDispatchReceivedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HopOdCodDispatchReceivedFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HopOdCodDispatchReceivedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
