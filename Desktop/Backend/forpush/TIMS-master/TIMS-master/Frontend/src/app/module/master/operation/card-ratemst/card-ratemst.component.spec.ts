import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRatemstComponent } from './card-ratemst.component';

describe('CardRatemstComponent', () => {
  let component: CardRatemstComponent;
  let fixture: ComponentFixture<CardRatemstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRatemstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRatemstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
