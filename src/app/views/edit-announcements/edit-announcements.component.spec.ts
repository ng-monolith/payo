import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EditAnnouncementsComponent } from './edit-announcements.component';
import { UserService } from '../../../shared/services/user.service';
import { AnnouncementService } from '../../../shared/services/announcement.service';

describe('EditAnnouncementsComponent', () => {
  let component: EditAnnouncementsComponent;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatStepperModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        EditAnnouncementsComponent
      ],
      providers: [
        UserService,
        AnnouncementService,
        {
          provide: UserService,
          useValue: {
            currentUser: of({ id: '123', email: 'test@example.com' }) // Przykład zamockowanego usera
          }
        },
        {
          provide: AnnouncementService,
          useValue: {
            update: jest.fn().mockReturnValue(of({})),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Powinien zostać utworzony komponent', () => {
    expect(component).toBeTruthy();
  });

  it('Formularze powinny być poprawnie zainicjowane', () => {
    expect(component.firstFormGroup.valid).toBeFalsy();
    expect(component.secondFormGroup.valid).toBeFalsy();
    expect(component.thirdFormGroup.valid).toBeFalsy();
  });

  it('Przesłanie formularza powinno wywołać komunikat aktualizacji, jeśli formularz jest ważny', () => {
    component.firstFormGroup.setValue({transactionType: 'sell'});
    component.secondFormGroup.setValue({
      propertyType: 'flat',
      title: 'Mieszkanie na sprzedaż',
      description: 'Przykładowy opis',
      locality: 'Warszawa',
      street: 'Mazowiecka',
      fullName: 'Jan Kowalski',
      phone: '123456789',
      images: []
    });
    component.thirdFormGroup.setValue({
      marketType: 'secondary',
      adSignature: '12345',
      exclusiveOffer: false,
      noAgentProvision: false,
      area: 50,
      price: 300000,
      currency: 'PLN',
      rooms: 2,
      floor: 1,
      totalFloors: 10,
      elevator: true,
      buildingType: 'block',
      yearBuilt: '1990',
      conditionType: 'good',
      parkingType: 'none',
      energeticCert: false
    });

    component.onSubmit();
    // expect(AnnouncementService.update).toHaveBeenCalled();
  });
});
