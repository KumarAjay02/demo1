import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import {AuthService} from '../core/auth.service';
import {Account} from '../core/account.model';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ RouterModule],
})
export default class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.accountService
      .identity()
      .subscribe(account => {
        this.account = account

        if (this.account !== null) {
          this.router.navigate(['/login']);
         // this.router.navigate(['dashboard']);  //uncomment when watn to login from chached login data
        } else {
          this.router.navigate(['login']);
        }
      },
        () => {
          this.router.navigate(['/login']);
        });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
