import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydivisionmstComponent } from './companydivisionmst.component';

describe('CompanydivisionmstComponent', () => {
  let component: CompanydivisionmstComponent;
  let fixture: ComponentFixture<CompanydivisionmstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanydivisionmstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanydivisionmstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
