import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStep, MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { NgIf } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { AnnouncementServiceService } from '../../../shared/services/announcement-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ListingDetails, PropertyDetails, TransactionDetails } from '../../../shared/models/announcement.dto';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatButtonModule,
    MatStepperModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatSlideToggle,
    MatSlideToggleModule,
    FormsModule,
    _MatSlideToggleRequiredValidatorModule,
    BannerComponent,
    NgIf,
    SearchComponent,
    HttpClientModule,
  ],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.scss'
})
export class AddListingComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  currentUser!: any;

  private userService = inject(UserService);
  private _formBuilder = inject(FormBuilder);
  private announcementService = inject(AnnouncementServiceService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      transactionType: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      propertyType: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      locality: ['', Validators.required],
      street: ['', Validators.required],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      images: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      marketType: ['', Validators.required],
      adSignature: ['-'],
      exclusiveOffer: [false],
      noAgentProvision: [false],
      area: ['', Validators.required],
      currency: ['', Validators.required],
      rooms: [''],
      floor: [''],
      totalFloors: [''],
      elevator: [false],
      buildingType: ['none', Validators.required],
      yearBuilt: [''],
      conditionType: ['none', Validators.required],
      parkingType: ['none'],
      energeticCert: [false],
    });
    this.getCurrentUser();
    this.setupTransactionTypeListener();
  }

  private updatePriceOrDepositField(type: string) {
    if (type === 'sell') {
      if (this.thirdFormGroup.contains('deposit')) {
        this.thirdFormGroup.removeControl('deposit');
        this.thirdFormGroup.removeControl('rent');
      }
      this.thirdFormGroup.addControl('price', new FormControl(0, Validators.required));
    } else if (type === 'rent') {
      if (this.thirdFormGroup.contains('price')) {
        this.thirdFormGroup.removeControl('price');
      }
      this.thirdFormGroup.addControl('deposit', new FormControl(0, Validators.required));
      this.thirdFormGroup.addControl('rent', new FormControl(0, Validators.required));
    }
  }

  private setupTransactionTypeListener() {
    this.firstFormGroup.get('transactionType')!.valueChanges.subscribe(type => {
      this.updatePriceOrDepositField(type);
    });
  }

  private getCurrentUser(): void {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const combinedData = {
        userId: this.currentUser?.id,
        transactionDetails: this.firstFormGroup.value as TransactionDetails,
        propertyDetails: this.secondFormGroup.value as PropertyDetails,
        listingDetails: this.thirdFormGroup.value as ListingDetails
      };

      this.announcementService.save(combinedData).subscribe({
        next: () => {
          this.snackBar.open('Ogłoszenie zostało dodane pomyślnie.', 'Zamknij', {
            duration: 5000,
          });
          this.resetForms();
          this.router.navigate(['/success']);
        },
        error: (error) => {
          this.snackBar.open('Nie udało się dodać ogłoszenia. Spróbuj ponownie.', 'Zamknij', {
            duration: 5000,
          });
          console.error('Failed to send data:', error);
        }
      });
    } else {
      this.snackBar.open('Formularz zawiera błędy. Sprawdź wszystkie dane.', 'Zamknij', {
        duration: 5000,
      });
    }
  }
  private resetForms() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
  }
}
