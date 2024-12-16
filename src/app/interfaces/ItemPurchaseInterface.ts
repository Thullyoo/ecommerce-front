import type Product from "./ProductInterface";

export interface ItemPurchase {
  id: number,         
  product: Product,
  quantity: number | Number
}