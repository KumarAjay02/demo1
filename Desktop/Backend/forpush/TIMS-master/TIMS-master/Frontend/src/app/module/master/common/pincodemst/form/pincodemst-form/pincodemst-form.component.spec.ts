import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodemstFormComponent } from './pincodemst-form.component';

describe('PincodemstFormComponent', () => {
  let component: PincodemstFormComponent;
  let fixture: ComponentFixture<PincodemstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PincodemstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PincodemstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
