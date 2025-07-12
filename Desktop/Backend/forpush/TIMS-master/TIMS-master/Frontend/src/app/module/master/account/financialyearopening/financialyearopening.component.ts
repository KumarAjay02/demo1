import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { FinancialyearopeaningService } from './service/financialyearopeaning.service';

@Component({
  selector: 'app-financialyearopening',
  imports: [RouterLink,],
  templateUrl: './financialyearopening.component.html',
  styleUrl: './financialyearopening.component.scss'
})
export class FinancialyearopeningComponent implements OnInit {

  yearForm!:FormGroup;

  constructor(private fb:FormBuilder){

  }
 ngOnInit(): void {
   this.yearForm=this.fb.group({
    selectYear:['']
   })
 }
selectData(){
  debugger;
const selectvalue=this.yearForm.get('selectYear').value;
console.log(selectvalue)
}
  
  
}
