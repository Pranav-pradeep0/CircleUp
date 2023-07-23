import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedComponent } from './dashboard/feed/feed.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { MessagingComponent } from './dashboard/messaging/messaging.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: IndexpageComponent },
  { path: 'about', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'moreDetails', component: MoreDetailsComponent },
  { path: '', loadChildren: () => DashboardModule }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
