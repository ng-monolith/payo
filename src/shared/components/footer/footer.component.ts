import { Component, inject, OnInit, NgZone } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  newsletterForm!: FormGroup;

  private newsletterService = inject(NewsletterService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

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
          this.ngZone.run(() => {
            this.router.navigate(['/newsletter-success']);
          });
        },
        (error) => {
          of(error)
        }
      );
    }
  }
}
