import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private formBuilder = inject(FormBuilder);

  private loginService = inject(AuthServiceService);

  private router = inject(Router);

  form = this.formBuilder.group({
    email: new FormControl<String>("", {validators: [Validators.requiredTrue], nonNullable: true}),
    password: new FormControl<String>("", {validators: [Validators.requiredTrue], nonNullable: true})
  });

  onSubmit(){
    this.loginService.login({
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    }).subscribe({
      next: res =>{
        this.loginService.saveToken(res.token);
        this.router.navigateByUrl("/home");
      },
      error: error =>{
        console.error(error);
      }
    })
  }
}
