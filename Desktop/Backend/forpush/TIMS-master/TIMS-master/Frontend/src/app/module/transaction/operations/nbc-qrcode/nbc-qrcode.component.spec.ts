import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbcQrcodeComponent } from './nbc-qrcode.component';

describe('NbcQrcodeComponent', () => {
  let component: NbcQrcodeComponent;
  let fixture: ComponentFixture<NbcQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbcQrcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbcQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
