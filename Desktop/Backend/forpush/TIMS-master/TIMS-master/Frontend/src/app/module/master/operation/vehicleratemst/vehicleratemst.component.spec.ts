import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleratemstComponent } from './vehicleratemst.component';

describe('VehicleratemstComponent', () => {
  let component: VehicleratemstComponent;
  let fixture: ComponentFixture<VehicleratemstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleratemstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleratemstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
