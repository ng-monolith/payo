import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  currentUser!: User | null;

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      fullName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      password: ['', [Validators.minLength(8)]],
      acceptTerms: [{ value: '', disabled: true }],
      remember: [false]
    });

    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.settingsForm.patchValue({
          fullName: user.fullName,
          email: user.email,
          password: '',
          acceptTerms: user.acceptTerms,
          remember: user.remember
        });
      }
    });
  }


  onSubmit(): void {
    if (this.settingsForm.valid && this.currentUser) {
      const updatedUser: Partial<User> = {
        fullName: this.settingsForm.get('fullName')!.value,
        acceptTerms: this.settingsForm.get('acceptTerms')!.value,
        remember: this.settingsForm.get('remember')!.value || false
      };

      const newPassword = this.settingsForm.get('password')!.value;

      this.userService.updateUser(this.currentUser.id!, updatedUser).subscribe({
        next: () => {
          this.snackBar.open('Dane użytkownika zostały zaktualizowane.', 'Zamknij', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Błąd podczas aktualizacji danych użytkownika:', error);
          this.snackBar.open('Nie udało się zaktualizować danych. Spróbuj ponownie.', 'Zamknij', {
            duration: 3000
          });
        }
      });

      if (newPassword) {
        this.userService.updatePassword(newPassword).subscribe({
          next: () => {
            this.snackBar.open('Hasło zostało zaktualizowane.', 'Zamknij', {
              duration: 3000
            });
          },
          error: (error) => {
            console.error('Błąd podczas aktualizacji hasła:', error);
            this.snackBar.open('Nie udało się zaktualizować hasła. Spróbuj ponownie.', 'Zamknij', {
              duration: 3000
            });
          }
        });
      }
    } else {
      this.snackBar.open('Formularz zawiera błędy. Sprawdź wszystkie dane.', 'Zamknij', {
        duration: 3000
      });
    }
  }
}
