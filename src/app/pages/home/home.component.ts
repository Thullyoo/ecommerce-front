import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import type Product from '../../interfaces/ProductInterface';
import type { Observable } from 'rxjs';
import { CardHomeComponent } from "../../components/card-home/card-home.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardHomeComponent],
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
  




}
