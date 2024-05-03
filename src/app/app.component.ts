import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { SearchComponent } from '../shared/components/search/search.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouteManagerService } from '../shared/services/route-manager.service';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, HeaderComponent, BannerComponent, SearchComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'payo';

  private authRoutes: string[];

  private route = inject(ActivatedRoute);
  private routeManager = inject(RouteManagerService);

  constructor() {
    this.authRoutes = this.routeManager.getAuthRoutes();
  }

  ngOnInit(): void {
    initFlowbite();
  }

  get isAuthRoute(): boolean {
    const path = this.route.snapshot.firstChild?.routeConfig?.path || '';
    return !this.authRoutes.includes(path);
  }
}
