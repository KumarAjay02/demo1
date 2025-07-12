import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBasicmstComponent } from './booking-basicmst.component';

describe('BookingBasicmstComponent', () => {
  let component: BookingBasicmstComponent;
  let fixture: ComponentFixture<BookingBasicmstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingBasicmstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingBasicmstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
