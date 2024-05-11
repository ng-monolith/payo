import { Component, inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule, MatStep } from '@angular/material/stepper';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { NgIf } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { ListingDetails, PropertyDetails, TransactionDetails } from '../../../shared/models/announcement.dto';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../../../shared/services/announcement.service';
import { User, UserRole } from '../../../shared/models/user';
import { MarketType, PropertyType } from '../../../shared/models/types';
import { Listing } from '../../../shared/models/listing';

@Component({
  selector: 'app-edit-announcements',
  standalone: true,
  imports: [
    MatStepperModule,
    MatStep,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatButtonModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    _MatSlideToggleRequiredValidatorModule,
    BannerComponent,
    NgIf,
    SearchComponent,
  ],
  templateUrl: './edit-announcements.component.html',
  styleUrls: ['./edit-announcements.component.scss']
})
export class EditAnnouncementsComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  currentUser: User = {
    id: '',
    fullName: '',
    email: '',
    password: '',
    acceptTerms: false,
    role: UserRole.Viewer
  };
  listingId!: string;

  private ngZone = inject(NgZone);
  private userService = inject(UserService);
  private _formBuilder = inject(FormBuilder);
  private announcementService = inject(AnnouncementService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
      energeticCert: [false]
    });
    this.getCurrentUser();
    this.setupTransactionTypeListener();
    this.loadListingData();
  }

  private updatePriceOrDepositField(type: string) {
    const listingDetails = this.thirdFormGroup.value as ListingDetails;

    if (type === 'sell') {
      if (this.thirdFormGroup.contains('deposit')) {
        this.thirdFormGroup.removeControl('deposit');
        this.thirdFormGroup.removeControl('rent');
      }
      this.thirdFormGroup.addControl(
        'price',
        new FormControl(listingDetails.price, Validators.required)
      );
    } else if (type === 'rent') {
      if (this.thirdFormGroup.contains('price')) {
        this.thirdFormGroup.removeControl('price');
      }
      this.thirdFormGroup.addControl(
        'deposit',
        new FormControl(listingDetails.deposit, Validators.required)
      );
      this.thirdFormGroup.addControl(
        'rent',
        new FormControl(listingDetails.rent, Validators.required)
      );
    }
  }

  private setupTransactionTypeListener() {
    this.firstFormGroup.get('transactionType')!.valueChanges.subscribe(type => {
      this.updatePriceOrDepositField(type);
    });
  }

  private getCurrentUser(): void {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

  private loadListingData(): void {
    this.route.params.subscribe(params => {
      this.listingId = params['id'];
      if (this.listingId) {
        this.announcementService.get(this.listingId).subscribe({
          next: listing => {
            this.firstFormGroup.patchValue({
              transactionType: listing.transactionDetails.transactionType
            });
            this.secondFormGroup.patchValue({
              propertyType: listing.propertyDetails.propertyType,
              title: listing.propertyDetails.title,
              description: listing.propertyDetails.description,
              locality: listing.propertyDetails.locality,
              street: listing.propertyDetails.street,
              fullName: listing.propertyDetails.fullName,
              phone: listing.propertyDetails.phone,
              images: listing.propertyDetails.images
            });
            this.thirdFormGroup.patchValue({
              marketType: listing.listingDetails.marketType,
              adSignature: listing.listingDetails.adSignature,
              exclusiveOffer: listing.listingDetails.exclusiveOffer,
              noAgentProvision: listing.listingDetails.noAgentProvision,
              area: listing.listingDetails.area,
              currency: listing.listingDetails.currency,
              rooms: listing.listingDetails.rooms,
              price: listing.listingDetails.price || 0,
              deposit: listing.listingDetails.deposit || 0,
              rent: listing.listingDetails.rent || 0,
              floor: listing.listingDetails.floor ? listing.listingDetails.floor.toString() : '',
              totalFloors: listing.listingDetails.totalFloors,
              elevator: listing.listingDetails.elevator,
              buildingType: listing.listingDetails.buildingType,
              yearBuilt: listing.listingDetails.yearBuilt,
              conditionType: listing.listingDetails.conditionType,
              parkingType: listing.listingDetails.parkingType,
              energeticCert: listing.listingDetails.energeticCert
            });
            this.firstFormGroup.updateValueAndValidity();
            this.secondFormGroup.updateValueAndValidity();
            this.thirdFormGroup.updateValueAndValidity();

            this.updatePriceOrDepositField(this.firstFormGroup.get('transactionType')!.value);
          },
          error: error => console.error('Failed to load listing data:', error)
        });
      }
    });
  }

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const combinedData: Partial<Listing> = {
        userId: this.currentUser.id,
        transactionDetails: this.firstFormGroup.value as TransactionDetails,
        propertyDetails: {
          ...this.secondFormGroup.value as PropertyDetails,
          propertyType: this.secondFormGroup.value.propertyType as PropertyType
        },
        listingDetails: {
          ...this.thirdFormGroup.value as ListingDetails,
          marketType: this.thirdFormGroup.value.marketType as MarketType,
          floor: this.thirdFormGroup.value.floor ? this.thirdFormGroup.value.floor.toString() : undefined
        }
      };

      this.announcementService.update(this.listingId, combinedData).subscribe({
        next: () => {
          this.snackBar.open('Ogłoszenie zostało zaktualizowane pomyślnie.', 'Zamknij', {
            duration: 5000
          });

          this.ngZone.run(() => {
            this.router.navigate(['/success']);

          });
        },
        error: () => {
          this.snackBar.open('Nie udało się zaktualizować ogłoszenia. Spróbuj ponownie.', 'Zamknij', {
            duration: 5000
          });
        }
      });
    } else {
      this.snackBar.open('Formularz zawiera błędy. Sprawdź wszystkie dane.', 'Zamknij', {
        duration: 5000
      });
    }
  }
}
