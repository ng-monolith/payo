import { Injectable, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Firestore, collection, doc, getDoc, getDocs, QuerySnapshot, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private firestore = inject(Firestore);
  private postsCollection = collection(this.firestore, 'posts');

  getPosts(): Observable<Post[]> {
    return from(getDocs(this.postsCollection)).pipe(
      map((snapshot: QuerySnapshot<DocumentData>) => snapshot.docs.map(doc => ({
        ...doc.data() as Post,
        id: doc.id
      }))),
      catchError(err => {
        throw new Error('Error getting documents: ' + err);
      })
    );
  }

  getPostById(postId: string): Observable<Post> {
    const postDocRef = doc(this.firestore, `posts/${postId}`);
    return from(getDoc(postDocRef)).pipe(
      map((docSnapshot: DocumentSnapshot<DocumentData>) => {
        if (docSnapshot.exists()) {
          return {
            ...docSnapshot.data() as Post,
            id: docSnapshot.id
          };
        } else {
          throw new Error('Post not found!');
        }
      }),
      catchError(err => {
        throw new Error('Error getting document: ' + err);
      })
    );
  }
}
