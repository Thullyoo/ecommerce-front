import { Component, inject, input, type OnInit } from '@angular/core';
import type Product from '../../interfaces/ProductInterface';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit{
  

  private productService = inject(ProductServiceService);

  private route = inject(ActivatedRoute);

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
    throw new Error('Method not implemented.');
  }
}
