import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { User } from '../../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    NgIf,
    AsyncPipe,
  ],
  providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'menu-overlay-pane' }
    }
  ]
})
export class NavigationComponent implements OnInit {
  currentUser$: Observable<User | null> = new BehaviorSubject<User | null>(null);

  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser;
  }

  logout(): void {
    this.userService.logoutUser();
  }
  navigateToAddListing(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.router.navigate(['/add-listing']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
