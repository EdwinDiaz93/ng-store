import { Routes } from '@angular/router';



export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products/products').then(c => c.Products),
  }, {
    path: ':id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(c => c.ProductDetail),
  }
];
