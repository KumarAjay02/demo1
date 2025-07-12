import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterMstComponent } from './cost-center-mst.component';

describe('CostCenterMstComponent', () => {
  let component: CostCenterMstComponent;
  let fixture: ComponentFixture<CostCenterMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCenterMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostCenterMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
