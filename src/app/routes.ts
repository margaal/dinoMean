import { Routes } from '@angular/router';
import { DinoComponent } from './dino/dino.component';
import { SignUpComponent } from './dino/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfilPageComponent } from './dino/profil-page/profil-page.component';
import { AuthGuardService } from './shared/auth-guard.service';

export const appRoutes: Routes = [
    {
        path: 'signup', component: SignUpComponent,
        //children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'signin', component: SignInComponent,
    },
    {
        path: 'home', component: HomeComponent,
    },
    {
        path: 'profile/:id', component: ProfilPageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    }
];