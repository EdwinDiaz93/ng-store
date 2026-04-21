import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class Utils {


  isValidField(form: FormGroup, field: string) {
    return form.get(field)?.errors || form.get(field)?.touched;
  }

  getFieldErrors(form: FormGroup, field: string) {
    let keys: string[] = []
    if (form.get(field)?.errors) {
      keys = Object.keys(form.get(field)?.errors!);
    }
    const errors: string[] = [];
    for (const key of keys) {
      switch (key) {
        case 'required':
          errors.push(`El campo ${field} es requerido`);
          break;
        case 'email':
          errors.push(`El campo ${field} debe ser un correo valido`);
          break;
        case 'minlength':
          errors.push(`El campo ${field} debe contener minimo ${form.get(field)?.errors![key].requiredLength} caracteres`)
          break;

      }
    }
    return errors;
  }

  getFormattedDate(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }

}
