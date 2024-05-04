import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
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

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
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
          console.log('Login successful:', response);
        },
        error: error => console.error('Login error:', error)
      });
    }
  }
}
