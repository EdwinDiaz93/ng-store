import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product as ProductService } from '../../services/product';
import { Product } from '../../interfaces';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  producto!: Product;

  ngOnInit(): void {
    this.getProduct()
  }

  returnBack() {
    this.router.navigateByUrl('/dashboard/productos');
  }
  getProduct() {
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (!id) return;

      this.productService.getProductById(id).subscribe((response) => {
        this.producto = response;
      })

    })
  }

}
