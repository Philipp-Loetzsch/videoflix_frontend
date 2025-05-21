import { Routes } from '@angular/router';
import { MainSiteComponent } from './components/main-site/main-site.component';
import { LandingPageComponent } from './components/main-site/landing-page/landing-page.component';
import { SignUpComponent } from './components/main-site/sign-up/sign-up.component';
import { LogInComponent } from './components/main-site/log-in/log-in.component';
import { OffersComponent } from './components/offers/offers.component';
import { LawComponent } from './components/law/law.component';
import { PrivacyPolicyComponent } from './components/law/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/law/legal-notice/legal-notice.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';

export const routes: Routes = [
{ path: '', component: MainSiteComponent, 
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'log_in', component: LogInComponent},
      { path: 'sign_up', component: SignUpComponent },
    ]
  },

  { path: 'offers', component: OffersComponent},
  { path: 'player', component: VideoplayerComponent},
  { path: 'law', component: LawComponent,
    children:[
        {path:"", component: PrivacyPolicyComponent},
        {path:"legal_notice", component: LegalNoticeComponent},
    ]
  },

];
