import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { UserService } from '../../../../shared/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: any;
  let userServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      loginUser: jest.fn().mockReturnValue({
        subscribe: jest.fn((handlers) => {
          if (handlers.next) handlers.next();
          if (handlers.error) handlers.error({ message: 'Nieprawidłowe dane logowania.' });
        })
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('powinien zostać utworzony', () => {
    expect(component).toBeTruthy();
  });

  it('powinien zainicjować formularz z domyślnymi wartościami', () => {
    expect(component.loginForm.value).toEqual({
      email: '',
      password: '',
      remember: false
    });
  });

  it('powinien włączyć przycisk "Zaloguj się" gdy formularz jest prawidłowo wypełniony', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.loginForm.controls['remember'].setValue(true);
    expect(component.loginForm.valid).toBeTruthy();
    expect(component.loginForm.value).toEqual({
      email: 'test@example.com',
      password: 'password123',
      remember: true
    });
  });

  it('powinien wyświetlić błąd gdy logowanie się nie powiedzie', () => {
    component.loginForm.controls['email'].setValue('invalid@example.com');
    component.loginForm.controls['password'].setValue('wrongPassword');
    component.onSubmit();
    expect(component.errorMessage).toBe('Nieprawidłowe dane logowania.');
  });

});
