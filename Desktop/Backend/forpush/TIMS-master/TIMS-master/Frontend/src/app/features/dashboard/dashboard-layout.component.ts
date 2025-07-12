import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../../layouts/navbar/navbar.component';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar> <!-- Navbar reloads here -->
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .main-content {
      margin-top: 10px;
      padding: 20px;
    }
  `]
})
export class DashboardLayoutComponent { }
