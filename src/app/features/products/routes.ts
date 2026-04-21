import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';

export const productRoutes: Routes = [
  {
    path: '',
    component: Products
  }, {
    path: ':id',
    component: ProductDetail
  }
];
