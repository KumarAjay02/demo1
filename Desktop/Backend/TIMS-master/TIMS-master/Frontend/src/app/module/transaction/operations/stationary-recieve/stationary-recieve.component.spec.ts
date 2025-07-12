import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationaryRecieveComponent } from './stationary-recieve.component';

describe('StationaryRecieveComponent', () => {
  let component: StationaryRecieveComponent;
  let fixture: ComponentFixture<StationaryRecieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationaryRecieveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationaryRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
