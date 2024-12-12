import { Component, input } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import type CardItemResponse from '../../interfaces/CardItemResponseInterface';

@Component({
  selector: 'app-card-cart',
  standalone: true,
  imports: [],
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.scss'
})
export class CardCartComponent{
  
    item = input.required<CardItemResponse>(); 

}
