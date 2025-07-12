import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchmstFormComponent } from './branchmst-form.component';

describe('BranchmstFormComponent', () => {
  let component: BranchmstFormComponent;
  let fixture: ComponentFixture<BranchmstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchmstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchmstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
