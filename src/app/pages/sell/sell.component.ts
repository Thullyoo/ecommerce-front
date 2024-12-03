import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductServiceService } from '../../services/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.scss'
})
export class SellComponent {

  private router = inject(Router);

  private formBuilder = inject(FormBuilder);

  private productService = inject(ProductServiceService);

  form = this.formBuilder.group({
    name: new FormControl<string>("",{validators: [Validators.required],nonNullable: true}),
    description: new FormControl<string>("",{validators: [Validators.required],nonNullable: true}),
    value: new FormControl<number>(0,{validators: [Validators.required], nonNullable: true}),
    quantity: new FormControl<number>(0, {validators: [Validators. required], nonNullable: true}),
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
  
    if(this.form.valid){
      this.productService.registerProduct({
        name: this.form.value.name!,
        description: this.form.value.description!,
        value: this.form.value.value!,
        quantity: this.form.value.quantity!,
        image: this.form.value.image!
      });
      this.router.navigateByUrl('/home');
    }
  }
}
