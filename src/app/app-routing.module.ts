import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/homePage/homePage.component';
import { AboutPageComponent } from './shared/pages/aboutPage/aboutPage.component';
import { ContactPageComponent } from './shared/pages/contactPage/contactPage.component';
import { ByCapitalPageComponent } from './countries/pages/by-capital-page/by-capital-page.component';

const routes: Routes = [
  // {
  //   path: "home",
  //   component: HomePageComponent
  // },
  // {
  //   path: "",
  //   component: ByCapitalPageComponent
  // },
  {
    path: "about",
    component: AboutPageComponent
  },
  {
    path: "contact",
    component: ContactPageComponent
  },
  {
    path: "countries",
    loadChildren: () => import('./countries/countries.module').then( m =>  m.CountriesModule )
  },
  {
    path: "**",
    redirectTo: "countries"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
