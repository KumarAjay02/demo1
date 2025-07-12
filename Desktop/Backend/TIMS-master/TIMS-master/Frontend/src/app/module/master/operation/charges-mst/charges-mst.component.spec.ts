import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesMstComponent } from './charges-mst.component';

describe('ChargesMstComponent', () => {
  let component: ChargesMstComponent;
  let fixture: ComponentFixture<ChargesMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargesMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargesMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
