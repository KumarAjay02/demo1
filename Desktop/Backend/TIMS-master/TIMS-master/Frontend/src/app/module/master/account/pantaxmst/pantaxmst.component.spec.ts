import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantaxmstComponent } from './pantaxmst.component';

describe('PantaxmstComponent', () => {
  let component: PantaxmstComponent;
  let fixture: ComponentFixture<PantaxmstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantaxmstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantaxmstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
