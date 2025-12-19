import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public readonly title = signal('Droppershop');
}
