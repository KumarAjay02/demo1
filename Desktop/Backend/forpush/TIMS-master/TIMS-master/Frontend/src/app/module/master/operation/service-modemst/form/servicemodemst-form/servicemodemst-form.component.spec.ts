import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicemodemstFormComponent } from './servicemodemst-form.component';

describe('ServicemodemstFormComponent', () => {
  let component: ServicemodemstFormComponent;
  let fixture: ComponentFixture<ServicemodemstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicemodemstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicemodemstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
