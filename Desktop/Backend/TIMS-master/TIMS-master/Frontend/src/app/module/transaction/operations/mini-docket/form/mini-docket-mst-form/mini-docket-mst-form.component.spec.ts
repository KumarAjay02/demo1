import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDocketMstFormComponent } from './mini-docket-mst-form.component';

describe('MiniDocketMstFormComponent', () => {
  let component: MiniDocketMstFormComponent;
  let fixture: ComponentFixture<MiniDocketMstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniDocketMstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniDocketMstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
