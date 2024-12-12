import { Component, inject, input, type OnInit } from '@angular/core';
import type Product from '../../interfaces/ProductInterface';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit{
  
  private cartService = inject(CartServiceService);

  private productService = inject(ProductServiceService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  quantity_product: Number | number = 1;

  product: Product ={
    id: "",
    name: "",
    value: 0,
    url_image: "",
    description: "",
    isAvailable: true,
    quantity: 0
  };

  productId: string | null = null;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId!).subscribe({
      next: res =>{
        this.product = res;
        console.log(res);
      },
      error: err =>{
        console.error(err);
      }
    })
  }

  selectedQuantity: number = 1;

  addToCart() {
    this.cartService.addCartItem({
      product_id: this.product.id,
      quantity: this.quantity_product
    });

    this.router.navigateByUrl('/my-cart');
  }
}
