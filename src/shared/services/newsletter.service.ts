import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private firestore = inject(Firestore);
  private newsletterCollection = collection(this.firestore, 'newsletters');

  send(email: string): Observable<any> {
    return from(addDoc(this.newsletterCollection, { email }));
  }
}
