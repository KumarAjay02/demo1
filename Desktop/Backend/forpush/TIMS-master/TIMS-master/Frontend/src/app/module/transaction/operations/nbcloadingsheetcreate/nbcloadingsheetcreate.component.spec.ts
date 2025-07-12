import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbcloadingsheetcreateComponent } from './nbcloadingsheetcreate.component';

describe('NbcloadingsheetcreateComponent', () => {
  let component: NbcloadingsheetcreateComponent;
  let fixture: ComponentFixture<NbcloadingsheetcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbcloadingsheetcreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbcloadingsheetcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
