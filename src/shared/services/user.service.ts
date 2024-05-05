import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';
import ApiUrls from '../configs/api-urls.config';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = ApiUrls.users;

  private http = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users.length > 0),
      catchError(error => throwError(error))
    );
  }

  loginUser(email: string, password: string, remember: boolean): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        const user = users.find(u => u.password === password);
        if (!user) {
          throw new Error('Invalid credentials');
        }
        return user;
      }),
      tap(user => {
        this.currentUserSubject.next(user);
        if (remember) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed: ' + error.message));
      })
    );
  }


  private updateCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }
  logoutUser(): void {
    this.updateCurrentUser(null);
    localStorage.removeItem('user');
    sessionStorage.clear();
  }
}
