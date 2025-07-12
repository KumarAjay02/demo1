import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMasterFormComponent } from './material-master-form.component';

describe('MaterialMasterFormComponent', () => {
  let component: MaterialMasterFormComponent;
  let fixture: ComponentFixture<MaterialMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialMasterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
