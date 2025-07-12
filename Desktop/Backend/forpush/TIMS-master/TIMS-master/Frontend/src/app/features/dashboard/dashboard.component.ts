import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../core/auth.service';
import { ApiService } from '../../core/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


interface UserProfile {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profile: UserProfile | null = null;
  isLoading = false;
  errorMessage = '';
  currentAccount: any;
  constructor(
    public authService: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
    //console.error('Profile load error:');
  }

  async loadProfile(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.get<UserProfile>('api/account').subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile';
        console.error('Profile load error:', err);
        this.isLoading = false;
      }
    });
  }

}
