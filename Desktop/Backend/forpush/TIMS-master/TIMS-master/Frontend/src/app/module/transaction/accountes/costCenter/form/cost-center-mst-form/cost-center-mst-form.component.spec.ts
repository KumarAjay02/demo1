import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterMstFormComponent } from './cost-center-mst-form.component';

describe('CostCenterMstFormComponent', () => {
  let component: CostCenterMstFormComponent;
  let fixture: ComponentFixture<CostCenterMstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCenterMstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostCenterMstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
