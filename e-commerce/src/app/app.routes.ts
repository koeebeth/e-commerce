import { Routes } from '@angular/router';
import LoginComponent from './pages/login/login.component';
import RegistrationComponent from './pages/registration/registration.component';
import MainComponent from './pages/main/main.component';
import NotFoundComponent from './pages/not-found/not-found.component';
import EditProfileComponent from './pages/edit-profile/edit-profile.component';
import ProfilePageComponent from './pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'main', title: 'CyberVault', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
export default routes;
