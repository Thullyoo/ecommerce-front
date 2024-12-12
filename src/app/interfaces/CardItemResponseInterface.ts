import type ProductDTO from "./ProductDTO";

export default interface CardItemResponse{
  product: ProductDTO,
  quantity: Number | number
}