import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  CollectionReference,
  where, query, deleteDoc, updateDoc,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Listing, ListingConfig } from '../models/listing';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private firestore = inject(Firestore);
  private announcementsCollection: CollectionReference = collection(this.firestore, 'announcements');

  save(data: any): Observable<any> {
    return from(addDoc(this.announcementsCollection, data));
  }

  getAllListingsByUser(userId: string): Observable<Listing[]> {
    const q = query(this.announcementsCollection, where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Listing) })))
    );
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

  update(id: string, data: Partial<Listing>): Observable<void> {
    const docRef = doc(this.firestore, `announcements/${id}`);
    return from(updateDoc(docRef, data));
  }

  delete(id: string): Observable<void> {
    const docRef = doc(this.firestore, `announcements/${id}`);
    return from(deleteDoc(docRef));
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
  searchListings(formValue: any): Observable<Listing[]> {
    let q = query(this.announcementsCollection);

    if (formValue.transactionType) {
      q = query(q, where('transactionDetails.transactionType', '==', formValue.transactionType));
    }
    if (formValue.marketType) {
      q = query(q, where('listingDetails.marketType', '==', formValue.marketType));
    }
    if (formValue.locality) {
      q = query(q, where('propertyDetails.locality', '==', formValue.locality));
    }
    if (formValue.priceMin) {
      q = query(q, where('listingDetails.price', '>=', formValue.priceMin));
    }
    if (formValue.priceMax) {
      q = query(q, where('listingDetails.price', '<=', formValue.priceMax));
    }
    if (formValue.areaMin) {
      q = query(q, where('listingDetails.area', '>=', formValue.areaMin));
    }
    if (formValue.areaMax) {
      q = query(q, where('listingDetails.area', '<=', formValue.areaMax));
    }

    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Listing) })))
    );
  }
}
