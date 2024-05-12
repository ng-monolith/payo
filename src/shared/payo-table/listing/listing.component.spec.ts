import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListingComponent } from './listing.component';
import { AnnouncementService } from '../../services/announcement.service';
import { of } from 'rxjs';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let announcementServiceMock: any;

  const mockListings = [
    {
      id: '1',
      propertyDetails: {
        title: 'Test Property',
        images: ['/path/to/image.jpg'],
        locality: 'Sample Locality'
      },
      listingDetails: {
        price: 250000,
        rent: 1200,
        currency: 'USD',
        area: 120
      }
    }
  ];

  beforeEach(async () => {
    announcementServiceMock = {
      getAllListings: jest.fn()
    };

    announcementServiceMock.getAllListings.mockReturnValue(of(mockListings));

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ListingComponent
      ],
      providers: [
        { provide: AnnouncementService, useValue: announcementServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
  });

  it('Powinien tworzyć komponent', () => {
    expect(component).toBeTruthy();
  });

  it('Powinien zainicjować listy na init', () => {
    fixture.detectChanges();

    expect(component.listings.length).toBe(1);
    expect(component.listings[0].propertyDetails.title).toEqual('Test Property');
  });

  it('Powinien poprawnie wyświetlać oferty', () => {
    fixture.detectChanges();

    const priceElement = fixture.nativeElement.querySelector('.listing-details__price');
    expect(priceElement.textContent).toContain('250000 USD');
  });
});
