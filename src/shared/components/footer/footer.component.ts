import { Component, inject, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  newsletterForm!: FormGroup;

  private newsletterService = inject(NewsletterService);
  private router = inject(Router);

    ngOnInit(): void {
      initFlowbite();
      this.newsletterForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
      });
    }

  onSubmit() {
    if (this.newsletterForm.valid) {
      this.newsletterService.send(this.newsletterForm.value.email).subscribe(
        () => {
          console.log('Dziękujemy za zapisanie się do newslettera!');
          this.router.navigate(['/newsletter-success']);
        },
        (error) => {
          console.error('Wystąpił błąd podczas zapisywania do newslettera, spróbuj ponownie.', error);
        }
      );
    } else {
      console.error('Formularz zawiera błędy. Sprawdź wszystkie dane.');
    }
  }
}
