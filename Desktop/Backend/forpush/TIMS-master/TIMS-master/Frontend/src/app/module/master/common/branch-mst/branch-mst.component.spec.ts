import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchMstComponent } from './branch-mst.component';

describe('BranchMstComponent', () => {
  let component: BranchMstComponent;
  let fixture: ComponentFixture<BranchMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
