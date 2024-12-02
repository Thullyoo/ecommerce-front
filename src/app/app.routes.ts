import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthServiceService } from './services/auth-service.service';

export const routes: Routes = [
  { 
    path: 'home',
     component: HomeComponent, 
     canActivate: [AuthServiceService] 
  }, 
  {
    path: "login",
    component: LoginComponent
  },
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  }, 
  { 
    path: '**', 
    redirectTo: '/home' 
  } 


];
