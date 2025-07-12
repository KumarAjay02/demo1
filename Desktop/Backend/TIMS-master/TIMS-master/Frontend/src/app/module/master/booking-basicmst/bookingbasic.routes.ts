import { Routes } from "@angular/router";
import { BookingBasicmstComponent } from "./booking-basicmst.component";
import { BookingbasismstFormComponent } from "./form/bookingbasismst-form/bookingbasismst-form.component";


export const BookingBasisRoutes:Routes=[
{
    path:'',component:BookingBasicmstComponent,title:'Booking basic'
},
{
    path:'add',component:BookingbasismstFormComponent,title:'Booking Basis Mode Form'
},
{  path:'view/:code',component:BookingbasismstFormComponent,title:'view'},
{  path:'edit/:code',component:BookingbasismstFormComponent,title:'edit'},
]