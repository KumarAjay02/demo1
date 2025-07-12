import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:Frontend/src/app/module/accountes/debit -Note/debit-note.component.spec.ts
import { DebitNoteComponent } from './debit-note.component';

describe('DebitNoteComponent', () => {
  let component: DebitNoteComponent;
  let fixture: ComponentFixture<DebitNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitNoteComponent);
========
import { PantaxmstformComponent } from './pantaxmstform.component';

describe('PantaxmstformComponent', () => {
  let component: PantaxmstformComponent;
  let fixture: ComponentFixture<PantaxmstformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantaxmstformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantaxmstformComponent);
>>>>>>>> 8cd5bf03eb4053fc73c528f19ada7a12bcfaeb45:Frontend/src/app/module/master/account/pantaxmst/form/pantaxmstform/pantaxmstform.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
