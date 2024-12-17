import { Router, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthServiceService } from './services/auth-service.service';
import { SellComponent } from './pages/sell-page/sell.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { MyPurchasesComponent } from './pages/my-purchases/my-purchases.component';
import { MySalesComponent } from './pages/my-sales/my-sales.component';

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
    path: "my-products",
    component: MyProductsComponent,
    canActivate: [AuthServiceService]
  },
  {
    path: "my-cart",
    component: ShoppingCartComponent,
    canActivate: [AuthServiceService]
  },
  {
    path: "my-purchases",
    component: MyPurchasesComponent,
    canActivate: [AuthServiceService]
  },
  {
    path: "my-sales",
    component: MySalesComponent,
    canActivate: [AuthServiceService]
  },
  { 
    path: 'product/:id',
    component: ProductPageComponent 
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
