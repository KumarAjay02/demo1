import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymstComponent } from './companymst.component';

describe('CompanymstComponent', () => {
  let component: CompanymstComponent;
  let fixture: ComponentFixture<CompanymstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanymstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanymstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
