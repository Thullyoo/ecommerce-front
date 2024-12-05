import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import type Product from '../../interfaces/ProductInterface';
import type { Observable } from 'rxjs';
import { CardHomeComponent } from "../../components/card-home/card-home.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardHomeComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private productService = inject(ProductServiceService);

  public products: Product[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      {
        next: response => {
          this.products = response;
          console.log(this.products);
        },
        error: err => {
          console.error(err);
        }
      }
    );
  }
  searchProduct(query: string): void {
    this.productService.getProductByName(query).subscribe({
      next: res =>{
        if(res.length <= 0){
          this.productService.getProducts().subscribe(
            {
              next: response => {
                this.products = response;
              },
              error: err => {
                console.error(err);
              }
            }
          );
          window.alert("Product not founded");
          return
        }
        this.products = res;
      }
    })
  }
}
