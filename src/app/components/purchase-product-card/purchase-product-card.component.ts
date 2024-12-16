import { Component, input, type OnInit } from '@angular/core';
import type Product from '../../interfaces/ProductInterface';

@Component({
  selector: 'app-purchase-product-card',
  standalone: true,
  imports: [],
  templateUrl: './purchase-product-card.component.html',
  styleUrl: './purchase-product-card.component.scss'
})
export class PurchaseProductCardComponent implements OnInit {
  ngOnInit(): void {
    this.quantityTrue = this.quantity();
  }
  quantityTrue: Number | number = 0;
  product = input.required<Product>();
  quantity = input.required<Number | number>();

  
}
