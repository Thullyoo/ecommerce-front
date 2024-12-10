import { Component, EventEmitter, inject, Input, input, Output, type OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import type Product from '../../interfaces/ProductInterface';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss'
})
export class FormEditComponent implements OnInit{
  onExit() {
    this.close.emit();
  }
  ngOnInit(): void {
    this.form.patchValue({
      name: this.product.name,
      value: this.product.value,
      description: this.product.description,
      quantity: this.product.quantity
    });
  }

  @Output() close = new EventEmitter<void>();

  @Input({ required: true }) product!: Product;

  private router = inject(Router);

  private formBuilder = inject(FormBuilder);

  private productService = inject(ProductServiceService);

  form = this.formBuilder.group({
    name: new FormControl<String>("",{validators: [Validators.required],nonNullable: true}),
    description: new FormControl<String>("",{validators: [Validators.required],nonNullable: true}),
    value: new FormControl<Number>(0,{validators: [Validators.required], nonNullable: true}),
    quantity: new FormControl<Number>(0, {validators: [Validators. required], nonNullable: true}),
    image: new FormControl<File | null>(null, {validators: [Validators. required], nonNullable: true})
  })

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ image: file });
    }
  }

  onSubmit() {
      let image = null;
      if(this.form.controls.image == null){
        image = null;
      } else{
        image = this.form.controls.image 
      }
    
      this.productService.editProduct({
        name: this.form.value.name!,
        description: this.form.value.description!,
        value: this.form.value.value!,
        quantity: this.form.value.quantity!,
        image: this.form.value.image!
      }, this.product.id);
      this.router.navigateByUrl('/my-products');
  }
}
