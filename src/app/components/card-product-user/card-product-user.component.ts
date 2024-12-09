import { Component, input } from '@angular/core';
import type Product from '../../interfaces/ProductInterface';

@Component({
  selector: 'app-card-product-user',
  standalone: true,
  imports: [],
  templateUrl: './card-product-user.component.html',
  styleUrl: './card-product-user.component.scss'
})
export class CardProductUserComponent {

  public product = input.required<Product>();
  
}
