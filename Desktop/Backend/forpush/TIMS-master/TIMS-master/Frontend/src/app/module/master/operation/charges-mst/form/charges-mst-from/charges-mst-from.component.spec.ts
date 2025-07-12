import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesMstFromComponent } from './charges-mst-from.component';

describe('ChargesMstFromComponent', () => {
  let component: ChargesMstFromComponent;
  let fixture: ComponentFixture<ChargesMstFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargesMstFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargesMstFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
