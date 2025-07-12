import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyMstFormComponent } from './currency-mst-form.component';

describe('CurrencyMstFormComponent', () => {
  let component: CurrencyMstFormComponent;
  let fixture: ComponentFixture<CurrencyMstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyMstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyMstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
