import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDocketMstComponent } from './mini-docket-mst.component';

describe('MiniDocketMstComponent', () => {
  let component: MiniDocketMstComponent;
  let fixture: ComponentFixture<MiniDocketMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniDocketMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniDocketMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
