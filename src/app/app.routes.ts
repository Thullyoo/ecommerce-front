import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthServiceService } from './services/auth-service.service';
import { SellComponent } from './pages/sell/sell.component';

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
    path: "sell",
    component: SellComponent,
    canActivate: [AuthServiceService] 
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
