
import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../../../shared/services/utils';
import { Auth } from '../../service/auth';
import { LoginRequest, LoginResponse } from '../../interfaces';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {


  private readonly formBuiler = inject(FormBuilder);
  private readonly utils = inject(Utils)
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  public loginForm: FormGroup = this.formBuiler.group({
    username: ['emilys', [Validators.required, Validators.minLength(5)]],
    password: ['emilyspass', [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit(): void {
    this.checkAuth()
  }

  checkAuth() {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }
    this.auth.login(this.loginForm.value as LoginRequest).subscribe((response:LoginResponse) => {
      this.auth.setUser(response);

    })
  }

  isValidField(form: FormGroup, field: string) {
    return this.utils.isValidField(form, field);
  }

  getFieldErrors(form: FormGroup, field: string) {
    return this.utils.getFieldErrors(form, field);

  }

}
