import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private formBuilder = inject(FormBuilder);

  private loginService = inject(AuthServiceService);

  private router = inject(Router);

  private toastService = inject(ToastrService);

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
        this.loginService.saveToken(res);
        this.router.navigateByUrl("/home");
      },
      error: error =>{
        this.toastService.error("Email or password incorrect");
      }
    })
  }
}
