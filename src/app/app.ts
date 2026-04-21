import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Loading } from './shared/services/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public readonly loading = inject(Loading);



}
