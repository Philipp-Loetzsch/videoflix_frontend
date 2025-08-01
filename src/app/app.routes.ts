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
import { ForgotPasswordComponent } from './components/main-site/forgot-password/forgot-password.component';
import { Page404Component } from './components/page-404/page-404.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ResetPasswordComponent } from './components/main-site/reset-password/reset-password.component';

export const routes: Routes = [
{ path: '', component: MainSiteComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'log_in', component: LogInComponent},
      { path: 'sign_up', component: SignUpComponent },
      { path: 'forgot_password', component: ForgotPasswordComponent},
      { path: 'reset_password/:uidb64/:token', component: ResetPasswordComponent},


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
  {path: 'activate/:uidb64/:token', component: ActivateAccountComponent},
  {path:'**', component: Page404Component}

];
