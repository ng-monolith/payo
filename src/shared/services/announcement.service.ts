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
  private readonly announcementsCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.announcementsCollection = collection(this.firestore, 'announcements');
  }

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
  searchListings(filters: any): Observable<Listing[]> {
    let queries = query(this.announcementsCollection);

    if (filters.transactionType) {
      queries = query(queries, where('transactionDetails.transactionType', '==', filters.transactionType));
    }
    if (filters.marketType) {
      queries = query(queries, where('listingDetails.marketType', '==', filters.marketType));
    }
    if (filters.locality) {
      queries = query(queries, where('propertyDetails.locality', '==', filters.locality));
    }
    if (filters.priceMin) {
      queries = query(queries, where('listingDetails.price', '>=', +filters.priceMin));
    }
    if (filters.priceMax) {
      queries = query(queries, where('listingDetails.price', '<=', +filters.priceMax));
    }
    if (filters.areaMin) {
      queries = query(queries, where('listingDetails.area', '>=', +filters.areaMin));
    }
    if (filters.areaMax) {
      queries = query(queries, where('listingDetails.area', '<=', +filters.areaMax));
    }

    return from(getDocs(queries)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Listing) })))
    );
  }
}
