import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatSelectModule,
  MatMenuModule, MatIconModule, MatListModule, MatProgressBarModule, MatDialogModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component'
import { AuthentificationService} from '../authentification.service';
import { AuthGuardService} from '../auth-guard.service';
import { DialogOverviewExampleDialogComponent, ServicesComponent} from './services/services.component';
import { ServicesListComponent } from './services-list/services-list.component';
import {ServicesService} from '../services.service';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'services-list', component: ServicesListComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: '', component: LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ServicesComponent,
    ServicesListComponent,
    DialogOverviewExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes),
    MatListModule
  ],
  entryComponents : [DialogOverviewExampleDialogComponent],
  providers: [AuthGuardService,AuthentificationService,ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
