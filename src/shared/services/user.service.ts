import { inject, Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  fetchSignInMethodsForEmail, User as FirebaseUser, onAuthStateChanged
} from '@angular/fire/auth';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromAuthState();
  }

  private loadUserFromAuthState() {
    onAuthStateChanged(this.auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
        const docSnapshot = await getDoc(userDocRef);
        const user = docSnapshot.data() as User;
        if (user) {
          const idToken = await firebaseUser.getIdToken();
          sessionStorage.setItem('idToken', idToken);
          this.updateCurrentUser(user);
        } else {
          console.warn(`User data not found for UID: ${firebaseUser.uid}`);
        }
      } else {
        this.updateCurrentUser(null);
      }
    });
  }

  registerUser(user: User): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, user.email, user.password)).pipe(
      switchMap(cred => {
        const userWithId: User = { ...user, id: cred.user.uid };
        const userDocRef = doc(this.firestore, `users/${cred.user.uid}`);
        return from(setDoc(userDocRef, userWithId)).pipe(map(() => userWithId));
      }),
      catchError(error => {
        console.error('Failed to register user:', error);
        throw error;
      })
    );
  }

  loginUser(email: string, password: string, remember: boolean): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(async (cred) => {
        const userDocRef = doc(this.firestore, `users/${cred.user.uid}`);
        const docSnapshot = await getDoc(userDocRef);
        const user = docSnapshot.data() as User;
        if (!user) {
          console.warn(`User data not found for UID: ${cred.user.uid}`);
          throw new Error('User data not found');
        }

        const idToken = await cred.user.getIdToken();
        sessionStorage.setItem('idToken', idToken);
        this.currentUserSubject.next(user);

        if (remember) {
          localStorage.setItem('remember', 'true');
        } else {
          localStorage.removeItem('remember');
        }

        return user;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        throw new Error('Login failed: ' + error.message);
      })
    );
  }

  logoutUser(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      map(() => {
        this.currentUserSubject.next(null);
        sessionStorage.removeItem('idToken');
        localStorage.removeItem('remember');
        sessionStorage.clear();
      })
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return from(fetchSignInMethodsForEmail(this.auth, email)).pipe(
      map((methods: string[]) => methods.length > 0),
      catchError(() => of(false))
    );
  }

  getIdToken(): string | null {
    return sessionStorage.getItem('idToken');
  }

  private updateCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    console.log('Current user:', user);
  }
}
