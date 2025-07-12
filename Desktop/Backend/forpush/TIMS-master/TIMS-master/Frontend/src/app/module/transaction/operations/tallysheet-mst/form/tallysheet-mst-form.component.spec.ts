import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallysheetMstFormComponent } from './tallysheet-mst-form.component';

describe('TallysheetMstFormComponent', () => {
  let component: TallysheetMstFormComponent;
  let fixture: ComponentFixture<TallysheetMstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TallysheetMstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallysheetMstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
