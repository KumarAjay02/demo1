import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodemstComponent } from './pincodemst.component';

describe('PincodemstComponent', () => {
  let component: PincodemstComponent;
  let fixture: ComponentFixture<PincodemstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PincodemstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PincodemstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
