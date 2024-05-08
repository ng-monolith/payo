import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { UserService } from '../../../../shared/services/user.service';
import { User, UserRole } from '../../../../shared/models/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterLink,
    HeaderComponent,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  protected registerForm: FormGroup;
  protected errorMessage: string | null = null;

  private userService = inject(UserService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  protected onSubmit(): void {
    const email = this.registerForm.value.email;

    this.userService.checkEmailExists(email).subscribe(exists => {
      if (!exists) {
        const newUser: User = {
          fullName: this.registerForm.value.fullName,
          email: email,
          password: this.registerForm.value.password,
          acceptTerms: this.registerForm.value.acceptTerms,
          role: UserRole.Viewer
        };

        this.userService.registerUser(newUser).subscribe({
          next: user => {
            console.log('User registered:', user);
            this.registerForm.reset();
            this.router.navigate(['/login']);
          },
          error: error => {
            console.error('Registration failed:', error);
            this.errorMessage = 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.';
          }
        });
      } else {
        this.errorMessage = 'Użytkownik o podanym adresie email już istnieje.';
      }
    });
  }
}
