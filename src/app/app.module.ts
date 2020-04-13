import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


@NgModule({
  declarations: [
    AppComponent,
    DinoComponent,
    SignUpComponent,
    HomeComponent,
    SignInComponent,
    ProfilPageComponent,
    EditDinoComponent,
    ListDinoComponent
  ],
  imports: [
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return localStorage.getItem(DinoService.TOKEN_KEY);
    //     },
    //     whitelistedDomains: [/^null$/],
    //     blacklistedRoutes: [environment.apiBaseUrl+"/auth/"]
    //   }
    // }),
    JwtModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    authInterceptorProviders
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
