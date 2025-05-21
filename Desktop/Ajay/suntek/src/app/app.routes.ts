import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LogoutComponent } from './logout/logout.component';
export const routes: Routes = [

    { path: 'about', component: AboutComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', component: HomeComponent }
    
];




