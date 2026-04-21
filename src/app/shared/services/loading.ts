import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loading {

  isLoading: boolean = false;

  showSpinner = () => { this.isLoading = true; }


  hideSprinner = () => { this.isLoading = false; }


}
