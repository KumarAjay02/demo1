import { Routes } from "@angular/router";
import { DebitNoteComponent } from "./debit-note.component";
import { DebitNoteFormComponent } from "./form/debit-note-form.component";
export const debitNoteRoutes:Routes=[
    {path:'',component:DebitNoteComponent,title:' debit Note'},
    {path:'add',component:DebitNoteFormComponent,title:'debit NoteForm'},
    {path:'view/:id',component:DebitNoteFormComponent,title:'view'},
    {path:'edit/:id',component:DebitNoteFormComponent,title:'edit'},    
]