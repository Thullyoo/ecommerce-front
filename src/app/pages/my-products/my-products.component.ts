import { RouterModule } from '@angular/router';
import { Component, inject, type OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import type Product from '../../interfaces/ProductInterface';
import { CardProductUserComponent } from '../../components/card-product-user/card-product-user.component';
import { CommonModule } from '@angular/common';
import { FormEditComponent } from '../../components/form-edit/form-edit.component';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CardProductUserComponent, CommonModule, RouterModule, FormEditComponent],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.scss'
})
export class MyProductsComponent implements OnInit{

  private productService = inject(ProductServiceService);

  products: Product[] = [];

  isFormVisible = false;
  selectedProduct: any = null;

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

  openForm(product: any) {
    this.isFormVisible = true;
    this.selectedProduct = product;
  }

  closeForm() {
    this.isFormVisible = false;
    this.selectedProduct = null;
  }
}
