import { Component, inject, type OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import type CardItemResponse from '../../interfaces/CardItemResponseInterface';
import { CardCartComponent } from '../../components/card-cart/card-cart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CardCartComponent, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit{
onBuy() {
throw new Error('Method not implemented.');
}

  cartService = inject(CartServiceService);
  total = 0.0;
  items: CardItemResponse[] = [];

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: res =>{
        this.items = res;
        res.forEach( item => {
          this.total += (Number(item.product.value) || 0) * (Number(item.quantity) || 0);
        })
      },
      error: err =>{
        console.error(err);
      }
    })
  }

  
}
