import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDispatchReceiveComponent } from './bill-dispatch-receive.component';

describe('BillDispatchReceiveComponent', () => {
  let component: BillDispatchReceiveComponent;
  let fixture: ComponentFixture<BillDispatchReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillDispatchReceiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillDispatchReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
