import { ItemPurchase } from './../../interfaces/ItemPurchaseInterface';
import { Component, inject, type OnInit } from '@angular/core';
import { PurchaseServiceService } from '../../services/purchase-service.service';
import type { PurchaseResponse } from '../../interfaces/PurchaseResponseInterface';
import { CommonModule } from '@angular/common';
import { PurchaseProductCardComponent } from '../../components/purchase-product-card/purchase-product-card.component';

@Component({
  selector: 'app-my-purchases',
  standalone: true,
  imports: [CommonModule, PurchaseProductCardComponent],
  templateUrl: './my-purchases.component.html',
  styleUrl: './my-purchases.component.scss'
})
export class MyPurchasesComponent implements OnInit{

  purchaseService = inject(PurchaseServiceService);

  purchases: PurchaseResponse[] = []

  ngOnInit(): void {
    this.purchaseService.getPurchases().subscribe({
      next : res =>{
        this.purchases = res;
        for(let purchase of this.purchases){
          console.log(purchase)
        }
      },
      error: err =>{
        console.error(err);
      }
    })
  }

}
