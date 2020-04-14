import { Routes } from '@angular/router';
import { DinoComponent } from './dino/dino.component';
import { SignUpComponent } from './dino/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfilPageComponent } from './dino/profil-page/profil-page.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ListDinoComponent } from './dino/list-dino/list-dino.component';
import { EditDinoComponent } from './dino/edit-dino/edit-dino.component';

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
        path: 'error/:code', component: ErrorPageComponent,
    },
    {
        path: 'profile/:id', component: ProfilPageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'list', component: ListDinoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'edit', component: EditDinoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    }
];