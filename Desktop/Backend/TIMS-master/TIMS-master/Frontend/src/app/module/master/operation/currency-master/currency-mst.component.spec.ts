import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyMstComponent } from './currency-mst.component';

describe('CurrencyMstComponent', () => {
  let component: CurrencyMstComponent;
  let fixture: ComponentFixture<CurrencyMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
