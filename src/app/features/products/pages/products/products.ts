import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Product as ProductService } from '../../services/product';
import { Product } from '../../interfaces';
import { SharedModule } from '../../../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProduct } from '../../../../shared/components';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {


  private router = inject(Router);
  private readonly product = inject(ProductService);
  private readonly matDialog = inject(MatDialog);

  public products: Product[] = [];
  public currentPage = 1;
  public totalItems = 1000;
  public itemsPerPage = 5;
  ngOnInit(): void {
    this.geProductos(0, 5);
  }

  geProductos(offset: number = 5, limit: number = 5) {
    this.product.getProductos(offset, limit).subscribe((response) => {
      this.products = response.products;
      this.totalItems = response.total;
    });
  }

  changePage(page: number) {


    this.currentPage = page;
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.geProductos(offset, 5);
  }

  openProductModal() {
    this.matDialog.open(AddEditProduct, {
      width: '50%',
      height: 'auto',
      disableClose: true,
    }).afterClosed().subscribe((result) => {

    })
  }

  viewDetial(id: number) {
    this.router.navigateByUrl(`/dashboard/productos/${id}`);
  }

}
