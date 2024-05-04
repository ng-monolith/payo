import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import ApiUrls from '../configs/api-urls.config';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = ApiUrls.users;

  private http = inject(HttpClient);

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users.length > 0),
      catchError(error => throwError(error))
    );
  }

  loginUser(email: string | null, password: string | null, remember: null | boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { email, password, remember }).pipe(
      catchError(error => throwError(() => new Error('Login failed', error)))
    );
  }
}
