import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-einvoice',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './einvoice.component.html',
  styleUrl: './einvoice.component.scss'
})
export class EinvoiceComponent implements OnInit {
  myForm!: FormGroup;

  customerRates = [
    {
      DocumentNo: '2403301059',
      ACKNO: '132521743536604',
      ACKDT: '01apr2025',
      IRN: '413a586d9aa06b0d0475642335f19d40699cce49697486be205b84855221670a',
      create_by: 'Siya Ram'
    },
    {
      DocumentNo: '2403301060',
      ACKNO: '132521743330790',
      ACKDT: '04apr2025',
      IRN: 'ef3dfbe597fd4da3be8f4c2a3b7cedadfbb5435b9accd5b9d60d853028c9515f',
      create_by: 'Siya Ram'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      ddlEinvoicetype: [''],
      txtDocumentNo: [''],
      Customer: [''],
      validFrom: [''],
      validTo: ['']
    });
  }

  trackId(index: number, item: any) {
    return index;
  }
 
}