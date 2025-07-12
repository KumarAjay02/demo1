import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingsheetStatusAndReportComponent } from './loadingsheet-status-and-report.component';

describe('LoadingsheetStatusAndReportComponent', () => {
  let component: LoadingsheetStatusAndReportComponent;
  let fixture: ComponentFixture<LoadingsheetStatusAndReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingsheetStatusAndReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingsheetStatusAndReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
