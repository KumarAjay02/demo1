import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingMstComponent } from './packing-mst.component';

describe('PackingMstComponent', () => {
  let component: PackingMstComponent;
  let fixture: ComponentFixture<PackingMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackingMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackingMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
