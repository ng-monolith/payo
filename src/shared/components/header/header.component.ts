import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavigationComponent,
    MatToolbar,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
