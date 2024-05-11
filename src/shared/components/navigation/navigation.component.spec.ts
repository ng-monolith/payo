import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let userServiceMock: any;
  let routerMock: any;
  let userSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    userSubject = new BehaviorSubject(null);

    userServiceMock = {
      currentUser: userSubject.asObservable(),
      logoutUser: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavigationComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'default',
              }
            }
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Powinien tworzyć komponent', () => {
    expect(component).toBeTruthy();
  });

  it('powinna obsługiwać logowanie użytkownika i wyświetlać prawidłowe opcje menu', () => {
    userSubject.next({ email: 'user@example.com' });
    component.currentUser$.subscribe(user => {
      expect(user?.email).toEqual('user@example.com');
    });
  });

  it('powinien przejść do strony logowania po wylogowaniu', () => {
    component.logout();
    expect(userServiceMock.logoutUser).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('powinien przejść do dodawania ogłoszeń, jeśli użytkownik jest zalogowany', () => {
    userSubject.next({ id: '1', email: 'user@example.com' });
    component.navigateToAddListing();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/add-listing']);
  });

  it('powinien przejść do logowania, jeśli użytkownik nie jest zalogowany podczas próby dodania ogłoszenia', () => {
    userSubject.next(null);
    component.navigateToAddListing();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
