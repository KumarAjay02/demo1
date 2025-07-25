import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadingSheetComponent } from './unloading-sheet.component';

describe('UnloadingSheetComponent', () => {
  let component: UnloadingSheetComponent;
  let fixture: ComponentFixture<UnloadingSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnloadingSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnloadingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
