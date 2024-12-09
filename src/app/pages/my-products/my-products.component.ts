import { Component, inject, type OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import type Product from '../../interfaces/ProductInterface';
import { CardProductUserComponent } from '../../components/card-product-user/card-product-user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CardProductUserComponent, CommonModule],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.scss'
})
export class MyProductsComponent implements OnInit{

  private productService = inject(ProductServiceService);

  products: Product[] = [];

  ngOnInit(): void {
    this.productService.getProductsByOwner().subscribe({
      next: res => {
        this.products = res;
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
