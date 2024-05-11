import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home/home.component';
import { BuyComponent } from './views/buy/buy/buy.component';
import { RentComponent } from './views/rent/rent/rent.component';
import { MyAccountComponent } from './views/my-account/my-account.component';
import { AddListingComponent } from './views/add-listing/add-listing.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { PageNotFoundComponent } from './views/auth/page-not-found/page-not-found.component';
import { BlogComponent } from './views/blog/blog/blog.component';
import { DetailsComponent } from '../shared/payo-table/details/details.component';
import { AnnouncementsComponent } from './views/announcements/announcements.component';
import { ForgotComponent } from './views/auth/forgot/forgot.component';
import { DetailsResolverService } from '../shared/Resolvers/details-resolver.resolver';
import { SinglePostComponent } from './views/blog/post-template/single-post/single-post.component';
import { SinglePostResolver } from '../shared/Resolvers/single-post.resolver';
import { SuccessPageComponent } from './views/pages/success-page/success-page.component';
import { FeaturesComponent } from './views/pages/features/features.component';
import { IntegrationsComponent } from './views/pages/integrations/integrations.component';
import { DocumentationComponent } from './views/pages/documentation/documentation.component';
import { PricingComponent } from './views/pages/pricing/pricing.component';
import { TermsComponent } from './views/pages/terms/terms.component';
import { PrivacyPolicyComponent } from './views/pages/privacy-policy/privacy-policy.component';
import { CompanyComponent } from './views/pages/company/company.component';
import { PressKitComponent } from './views/pages/press-kit/press-kit.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import {
  NewsletterSuccessPageComponent
} from './views/pages/newsletter-success-page/newsletter-success-page.component';
import { EditAnnouncementsComponent } from './views/edit-announcements/edit-announcements.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'rent', component: RentComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: SinglePostComponent, resolve: { blog: SinglePostResolver } },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'add-listing', component: AddListingComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'details/:id', component: DetailsComponent, resolve: { details: DetailsResolverService } },
  { path: 'features', component: FeaturesComponent },
  { path: 'integrations', component: IntegrationsComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'press-kit', component: PressKitComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'newsletter-success', component: NewsletterSuccessPageComponent },
  { path: 'edit/:id', component: EditAnnouncementsComponent },
  { path: '**', component: PageNotFoundComponent }
];
