import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-wrapper',
  imports: [],
  templateUrl: './dialog-wrapper.html',
  styleUrl: './dialog-wrapper.css',
})
export class DialogWrapper {

  @Input({ required: true }) title: string = '';

  @Input({ required: false }) primaryButtonTitle: string = '';
  @Input({ required: false }) secondaryButtonTitle: string = '';
  @Input({ required: false }) thirdButtonTitle: string = '';

  @Output() onPrimaryButtonClick: EventEmitter<void> = new EventEmitter();
  @Output() onSecondaryButtonClick: EventEmitter<void> = new EventEmitter();
  @Output() onthirdButtonClick: EventEmitter<void> = new EventEmitter();
  @Output() onCloseEvent: EventEmitter<void> = new EventEmitter();


  PrimaryButtonClick = () => this.onPrimaryButtonClick.emit();
  SecondaryButtonClick = () => this.onSecondaryButtonClick.emit();
  thirdButtonClick = () => this.onthirdButtonClick.emit();
  onClose = () => this.onCloseEvent.emit();
}
