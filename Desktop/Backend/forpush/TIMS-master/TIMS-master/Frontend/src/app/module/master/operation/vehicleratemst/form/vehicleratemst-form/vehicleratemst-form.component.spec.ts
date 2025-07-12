import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleratemstFormComponent } from './vehicleratemst-form.component';

describe('VehicleratemstFormComponent', () => {
  let component: VehicleratemstFormComponent;
  let fixture: ComponentFixture<VehicleratemstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleratemstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleratemstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
