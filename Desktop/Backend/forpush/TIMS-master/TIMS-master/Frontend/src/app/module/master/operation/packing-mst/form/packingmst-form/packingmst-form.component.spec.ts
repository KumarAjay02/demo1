import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingmstFormComponent } from './packingmst-form.component';

describe('PackingmstFormComponent', () => {
  let component: PackingmstFormComponent;
  let fixture: ComponentFixture<PackingmstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackingmstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackingmstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
