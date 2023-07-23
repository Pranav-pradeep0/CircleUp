import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagingComponent } from './messaging/messaging.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindPeoplesComponent } from './find-peoples/find-peoples.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import * as AOS from 'aos';



const dashboardRoutes:Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'messaging', component: MessagingComponent },
      { path: 'discover', component: FindPeoplesComponent},
      { path: 'settings', component: EditprofileComponent}
    ]
  }
];


@NgModule({
  declarations: [
    FeedComponent,
    ProfileComponent,
    MessagingComponent,
    DashboardComponent,
    FindPeoplesComponent,
    EditprofileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class DashboardModule { }
