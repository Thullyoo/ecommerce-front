import { Router, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthServiceService } from './services/auth-service.service';
import { SellComponent } from './pages/sell/sell.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [
      () => {
        const router = new Router();
        const authService = new AuthServiceService();
        if (authService.isTokenExpired()) {
          return true;  
        } else {
          return router.navigateByUrl('/home');
        }
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [
      () => {
        const router = new Router();
        const authService = new AuthServiceService();
        if (authService.isTokenExpired()) {
          return true;  
        } else {
          return router.navigateByUrl('/home');
        }
      }
    ]
  },
  { 
    path: 'home',
     component: HomeComponent, 
     canActivate: [AuthServiceService] 
  }, 
  {
    path: "sell",
    component: SellComponent,
    canActivate: [AuthServiceService] 
  },
  {
    path: "my-account",
    component: UserPageComponent,
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
