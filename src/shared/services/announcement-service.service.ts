import { inject, Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, getDoc, addDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Listing, ListingConfig } from '../models/listing';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementServiceService {
  private firestore = inject(Firestore);
  private announcementsCollection: CollectionReference = collection(this.firestore, 'announcements');

  save(data: any): Observable<any> {
    return from(addDoc(this.announcementsCollection, data));
  }

  getAllListings(config?: ListingConfig): Observable<Listing[]> {
    return from(getDocs(this.announcementsCollection)).pipe(
      map(snapshot => {
        let listings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Listing)
        }));
        if (config) {
          listings = listings.filter(listing =>
            config.transactionType ? listing.transactionDetails.transactionType === config.transactionType : true
          );
        }
        return listings;
      })
    );
  }

  get(id: string): Observable<Listing> {
    const docRef = doc(this.firestore, `announcements/${id}`);
    return from(getDoc(docRef)).pipe(
      map(snapshot => ({
        id: snapshot.id,
        ...(snapshot.data() as Listing)
      }))
    );
  }
}
