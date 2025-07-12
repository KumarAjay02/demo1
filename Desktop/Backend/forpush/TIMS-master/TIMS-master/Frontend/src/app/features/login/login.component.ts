import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/auth.service';
import {StateStorageService} from '../../core/auth/state-storage.service';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {CompanySelectionComponent} from '../company-selection/company-selection.component';


@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        CommonModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
      MatIconModule,

    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  authenticationError = false;
  isHide = false;
  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    rememberMe: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private stateStorageService: StateStorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
   //if already authenticated then navigate to home page
    this.authService.identity().subscribe(() => {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
      }
    });
  }

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return; // Exit early if form is invalid
    }

    this.isLoading = true;

    this.errorMessage = '';
    try {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: () => {
          this.authenticationError = false;
          this.isLoading = false;
          // Open modal for selection
          const dialogRef = this.dialog.open(CompanySelectionComponent, {
            disableClose: true,
            width: '640px',
            panelClass: 'flat-dialog',
            height:'340px'
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.router.navigate(['/dashboard']);
            }
          });
          // this.stateStorageService.storeUrl('dashboard');
          // const redirect = this.stateStorageService.getUrl();
          // if (redirect) {
          //   this.router.navigate(['dashboard']);
          // }
        },
        error: () => {
          this.authenticationError = true;
          this.isLoading = false;
          this.errorMessage = 'Login failed. Please try again.';
          console.error('Login error');
        },
      });
    } catch (error) {
      this.errorMessage = 'Login failed. Please try again.';
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }
  showHide(): void {
    this.isHide = !this.isHide;
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}
