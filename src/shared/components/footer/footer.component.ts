import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbar,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
    ngOnInit(): void {
      initFlowbite();
    }

}
