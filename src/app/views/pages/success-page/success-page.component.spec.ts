import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SuccessPageComponent } from './success-page.component';
import { MatCardModule } from '@angular/material/card';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from '../../../../environment/environment';

describe('SuccessPageComponent', () => {
  let component: SuccessPageComponent;
  let fixture: ComponentFixture<SuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        SuccessPageComponent,
        BannerComponent,
        SearchComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Powinien tworzyć komponent', () => {
    expect(component).toBeTruthy();
  });

  it('powinien wyświetlać wiadomość o sukcesie', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Sukces!');
  });

  it('powinien posiadać przyciski z odpowiednimi linkami nawigacyjnymi', () => {
    const compiled = fixture.debugElement.nativeElement;
    const homeButton = compiled.querySelector('a[routerLink="/"]');
    const addListingButton = compiled.querySelector('a[routerLink="/add-listing"]');
    expect(homeButton).toBeTruthy();
    expect(addListingButton).toBeTruthy();
  });
});
