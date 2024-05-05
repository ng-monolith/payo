import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
  ],
})
export class LoginComponent implements OnInit {

  private userService = inject(UserService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required] }),
    remember: new FormControl(false, {nonNullable: true})
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.remember) {
        this.loginForm.patchValue({
          email: user.email,
          password: user.password,
        });
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      const remember = this.loginForm.get('remember')!.value;

      this.userService.loginUser(email, password, remember).subscribe({
        next: response => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/']);
        },
        error: error => console.error('Login error:', error)
      });
    }
  }
}
