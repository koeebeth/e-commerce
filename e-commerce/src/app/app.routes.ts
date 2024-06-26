import { Routes } from '@angular/router';
import LoginComponent from './pages/login/login.component';
import RegistrationComponent from './pages/registration/registration.component';
import MainComponent from './pages/main/main.component';
import NotFoundComponent from './pages/not-found/not-found.component';
import ProfilePageComponent from './pages/profile-page/profile-page.component';
import CatalogPageComponent from './pages/catalog-page/catalog-page.component';
import ProductComponent from './pages/product/product.component';
import CategoriesComponent from './pages/categories/categories.component';
import CartComponent from './pages/cart/cart.component';
import AboutUsComponent from './pages/about-us/about-us.component';

const routes: Routes = [
  { path: 'main', title: 'CyberVault', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'catalog/:category/:id', component: ProductComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
export default routes;
