// route-manager.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteManagerService {
  private authRoutes = ['login', 'register',];

  getAuthRoutes(): string[] {
    return this.authRoutes;
  }
}
