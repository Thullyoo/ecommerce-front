import type { ItemPurchase } from "./ItemPurchaseInterface";

export interface PurchaseResponse {
  id: number;           
  total: number;       
  datePurchase: Date;   
  itemPurchases: ItemPurchase[]; 
}
