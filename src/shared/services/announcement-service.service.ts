import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import ApiUrlsConfig from '../configs/api-urls.config';
import { Listing, ListingConfig } from '../models/listing';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementServiceService {
  private apiUrl = ApiUrlsConfig.announcements;

  private http = inject(HttpClient);

  save(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllListings(config?: ListingConfig): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.apiUrl).pipe(
      map(listings => listings.filter(listing =>
        !config || (config.transactionType ? listing.transactionDetails.transactionType === config.transactionType : true)
      ))
    );
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
