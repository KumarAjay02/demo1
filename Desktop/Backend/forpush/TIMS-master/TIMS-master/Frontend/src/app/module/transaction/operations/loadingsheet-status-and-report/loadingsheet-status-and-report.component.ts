import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loadingsheet-status-and-report',
  imports: [CommonModule],
  templateUrl: './loadingsheet-status-and-report.component.html',
  styleUrl: './loadingsheet-status-and-report.component.scss'
})
export class LoadingsheetStatusAndReportComponent {


   today:any = new Date();
  currentdate = this.today.toISOString().split('T')[0];
}
