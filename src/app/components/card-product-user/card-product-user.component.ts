import { Component, EventEmitter, input, Output } from '@angular/core';
import type Product from '../../interfaces/ProductInterface';
import { FormEditComponent } from '../form-edit/form-edit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-product-user',
  standalone: true,
  imports: [FormEditComponent, CommonModule],
  templateUrl: './card-product-user.component.html',
  styleUrl: './card-product-user.component.scss'
})
export class CardProductUserComponent {
  

  public product = input.required<Product>();

  @Output() edit = new EventEmitter<any>();

  editProduct() {
    this.edit.emit(this.product);
  }
}
