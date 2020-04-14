import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DinoComponent } from './dino/dino.component';
import { SignUpComponent } from './dino/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfilPageComponent } from './dino/profil-page/profil-page.component';
import { EditDinoComponent } from './dino/edit-dino/edit-dino.component';
import { ListDinoComponent } from './dino/list-dino/list-dino.component';
import { authInterceptorProviders } from './jwt-interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { DinoAppbarComponent } from './dino-appbar/dino-appbar.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

registerLocaleData(localeFr, 'fr', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
    DinoComponent,
    SignUpComponent,
    HomeComponent,
    SignInComponent,
    ProfilPageComponent,
    EditDinoComponent,
    ListDinoComponent,
    ErrorPageComponent,
    DinoAppbarComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    JwtModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    
  ],
  providers: [
    authInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
