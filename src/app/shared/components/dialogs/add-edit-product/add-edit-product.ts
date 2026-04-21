import { Component, inject } from '@angular/core';
import { DialogWrapper } from "../../dialog-wrapper/dialog-wrapper";
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../../services/utils';
import { SharedModule } from '../../../shared-module';
import { Product } from '../../../../features/products/services/product';
import { productRequest } from '../../../../features/products/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-product',
  imports: [DialogWrapper, SharedModule],
  templateUrl: './add-edit-product.html',
  styleUrl: './add-edit-product.css',
})
export class AddEditProduct {

  private dialogRef = inject(DialogRef<AddEditProduct>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly utils = inject(Utils);
  private readonly product = inject(Product);

  public productForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.05)]],
    stock: [0, [Validators.required, Validators.min(1)]]

  });
  save() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.product.saveProduct(this.productForm.value as productRequest).subscribe((response: any) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title:'Producto Guardado en memoria',
        text: `Producto ${response.title} guardado con precio ${response.price} y stock ${response.stock}`,

        showConfirmButton: false,
        timer: 2000
      });

      //@ts-ignore
      this.dialogRef.close({ payload: null, action: 'onSave' });
    })

  }

  isValidField(form: FormGroup, field: string) {
    return this.utils.isValidField(form, field);
  }

  getFieldErrors(form: FormGroup, field: string) {
    return this.utils.getFieldErrors(form, field);
  }

  onClose() {
    //@ts-ignore
    this.dialogRef.close({ payload: null, action: 'onClose' })
  }

}
