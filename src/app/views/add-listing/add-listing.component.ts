import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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


  private _formBuilder = inject(FormBuilder);
  private announcementService = inject(AnnouncementServiceService);

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
      adSignature: [''],
      exclusiveOffer: [false],
      noAgentProvision: [false],
      area: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required],
      rooms: [''],
      floor: [''],
      totalFloors: [''],
      elevator: [false],
      buildingType: ['none'],
      yearBuilt: [''],
      conditionType: ['none'],
      parkingType: ['none'],
      energeticCert: [false],
    });
  }

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const combinedData = {
        transactionDetails: this.firstFormGroup.value as TransactionDetails,
        propertyDetails: this.secondFormGroup.value as PropertyDetails,
        listingDetails: this.thirdFormGroup.value as ListingDetails
      };

      this.announcementService.save(combinedData).subscribe({
        next: (response) => {
          console.log('Data sent successfully:', response);
        },
        error: (error) => {
          console.error('Failed to send data:', error);
        }
      });
    } else {
      console.error('One or more forms are invalid.');
    }
  }

}
