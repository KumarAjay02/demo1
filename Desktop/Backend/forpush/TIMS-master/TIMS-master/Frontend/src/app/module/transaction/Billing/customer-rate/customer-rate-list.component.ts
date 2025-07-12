import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerRateService } from './customer-rate.service';

@Component({
  selector: 'app-customer-rate-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatDialogModule],
  templateUrl: './customer-rate-list.component.html',
})
export class CustomerRateListComponent {
  private service = inject(CustomerRateService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  rateSearch: any = {
    customerCode: '',
    fromBranch: '',
    toBranch: '',
  };

  userRights = {
    add: true,
    update: true,
    delete: true,
    print: true,
    search: true,
  };

  customerRates: any[] = [
    {
      id: 1,
      customer_code: '11869',
      from_Branch: 'JPR',
      to_Branch: 'HSR2',
      mode: 'CARGO',
      charge_type: 'W',
      rate: 7.60,
      contract_No: 'GGCO1186910631',
      fix_rate: 0,
      hamali: 'CB',
      cft: 0,
      MINIMUM_WEIGHT:50,
    }
  ];

  ngOnInit() {
    // this.fetchRates(); // ❌ Commented for demo mode
  }

  fetchRates(): void {
    this.service.getAll().subscribe((data: any[]) => {
      this.customerRates = data;
    });
  }

  search(): void {
    this.service.search(this.rateSearch).subscribe((filtered: any[]) => {
      this.customerRates = filtered;
    });
  }

  BtnView(i: number): void {
    const selectedRate = this.customerRates[i];
    console.log('Viewing record:', selectedRate);
    // this.router.navigate(['/customer-rate/view', selectedRate.id]);
  }

  BtnUpdate(i: number): void {
    const selectedRate = this.customerRates[i];
    console.log('Updating record:', selectedRate);
    // this.router.navigate(['/customer-rate/update', selectedRate.id]);
  }

  trackId(index: number, item: any): any {
    return item.id;
  }
}
