import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbcloadingsheetcreatelistComponent } from './nbcloadingsheetcreatelist.component';

describe('NbcloadingsheetcreatelistComponent', () => {
  let component: NbcloadingsheetcreatelistComponent;
  let fixture: ComponentFixture<NbcloadingsheetcreatelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbcloadingsheetcreatelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbcloadingsheetcreatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
