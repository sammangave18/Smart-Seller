import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Product } from './components/product/product';
import { AddProduct } from './components/add-product/add-product';
import { EditProduct } from './components/edit-product/edit-product';
import { Seller } from './components/seller/seller';
import { AddSeller } from './components/add-seller/add-seller';
import { EditSeller } from './components/edit-seller/edit-seller';
export const routes: Routes = [
  {
    path: '',
    component: Login,
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },

  {
    path: 'products',
    component: Product,
    canActivate: [authGuard],
  },

  {
    path: 'add-product',
    component: AddProduct,
    canActivate: [authGuard],
  },

  {
    path: 'edit-product/:id',
    component: EditProduct,
    canActivate: [authGuard],
  },
  {
    path: 'seller',
    component: Seller,
    canActivate: [authGuard],
  },
  {
    path: 'add-seller',
    component: AddSeller,
    canActivate: [authGuard],
  },
  {
    path: 'edit-seller/:id',
    component: EditSeller,
    canActivate: [authGuard],
  },
];
