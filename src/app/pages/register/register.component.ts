import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private formBuilder = inject(FormBuilder);

  private router = inject(Router);

  private userService = inject(UserServiceService);

  form = this.formBuilder.group({
    name: new FormControl<string>("", {validators: [Validators.requiredTrue], nonNullable: true}),
    email: new FormControl<string>("", {validators: [Validators.requiredTrue], nonNullable: true}),
    password: new FormControl<string>("", {validators: [Validators.requiredTrue], nonNullable: true}),
    document: new FormControl<string>("", {validators: [Validators.requiredTrue], nonNullable: true}),
    dateOfBirth: new FormControl<Date | null>(null,{validators: [Validators.requiredTrue], nonNullable: true})
  });

  onSubmit(){
    this.userService.registerUser(
      {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        date_of_birth: this.form.controls.dateOfBirth.value!,
        document: this.form.controls.document.value
      }
    ).subscribe({
      next: res => {
        this.router.navigateByUrl('/login');
      },
      error: err =>{
        console.error(err);
      }
    })
  }

}
