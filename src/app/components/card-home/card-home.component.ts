import { Component, input } from '@angular/core';
import type Product from '../../interfaces/ProductInterface';

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.scss'
})
export class CardHomeComponent {
  
    public product = input.required<Product>();

}
