import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnnouncementServiceService } from '../services/announcement-service.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsResolverService implements Resolve<any> {
  private announcementService = inject(AnnouncementServiceService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    if (id === null) {
      console.error('No ID provided for details');
      return of(null);
    }

    return this.announcementService.get(id).pipe(
      catchError(error => {
        console.error('Fetching details failed', error);
        return of(null);
      })
    );
  }
}
