import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NewsletterService } from '../../services/newsletter.service';
import { throwError, of } from 'rxjs';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let newsletterServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    // Mock NewsletterService
    newsletterServiceMock = {
      send: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: NewsletterService, useValue: newsletterServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    jest.spyOn(router, 'navigate');

    component.newsletterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    fixture.detectChanges();
  });

  it('Powinien tworzyć komponent', () => {
    expect(component).toBeTruthy();
  });

  it('nie powinien wysyłać formularza, jeśli adres e-mail jest nieprawidłowy', () => {
    component.newsletterForm.controls['email'].setValue('invalid-email');
    component.onSubmit();
    expect(newsletterServiceMock.send).not.toHaveBeenCalled();
  });

  it('powinien przesłać formularz, jeśli e-mail jest prawidłowy i przejść do strony sukcesu', () => {
    component.newsletterForm.controls['email'].setValue('test@example.com');
    newsletterServiceMock.send.mockReturnValue(of({}));
    component.onSubmit();
    expect(newsletterServiceMock.send).toHaveBeenCalledWith('test@example.com');
    expect(router.navigate).toHaveBeenCalledWith(['/newsletter-success']);
  });

  it('powinien obsługiwać błędy podczas przesyłania formularza', () => {
    component.newsletterForm.controls['email'].setValue('test@example.com');
    newsletterServiceMock.send.mockReturnValue(throwError(() => new Error('Error')));
    component.onSubmit();
    expect(newsletterServiceMock.send).toHaveBeenCalledWith('test@example.com');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
