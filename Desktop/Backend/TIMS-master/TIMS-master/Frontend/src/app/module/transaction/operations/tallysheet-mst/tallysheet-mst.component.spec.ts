import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallysheetMstComponent } from './tallysheet-mst.component';

describe('TallysheetMstComponent', () => {
  let component: TallysheetMstComponent;
  let fixture: ComponentFixture<TallysheetMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TallysheetMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallysheetMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
