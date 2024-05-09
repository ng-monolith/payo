import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { Listing } from '../../../shared/models/listing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgForOf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AnnouncementService } from '../../../shared/services/announcement.service';
import {
  ConfirmationDialogComponent
} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  listings: Listing[] = [];
  private announcementService = inject(AnnouncementService);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadListings();
  }

  private loadListings(): void {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.announcementService.getAllListingsByUser(user.id!).subscribe({
          next: listings => this.listings = listings,
          error: error => console.error('Failed to load listings:', error)
        });
      }
    });
  }

  editListing(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  confirmDeleteListing(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Czy na pewno chcesz usunąć to ogłoszenie?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteListing(id);
      }
    });
  }

  private deleteListing(id: string): void {
    this.announcementService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Ogłoszenie zostało usunięte.', 'Zamknij', { duration: 3000 });
        this.loadListings();
      },
      error: error => {
        this.snackBar.open('Nie udało się usunąć ogłoszenia. Spróbuj ponownie.', 'Zamknij', { duration: 3000 });
        console.error('Failed to delete listing:', error);
      }
    });
  }
}
