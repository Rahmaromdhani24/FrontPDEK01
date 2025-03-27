import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginUserComponent } from './Authentification/login-user/login-user.component';
import { PageNotFoundComponent } from './Authentification/page-not-found/page-not-found.component';

export const routes: Routes = [

  
  { path: "", component: LoginUserComponent }, // Page par défaut : login
  { path: "login", component: LoginUserComponent }, // Ajout de la route login
 

    {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
     
    ],
  },

  {
     path: '**', component: PageNotFoundComponent ,

  },
];
/*{path:"" , component:LoginUserComponent },
  {path:"login" , component:LoginUserComponent },
  {path:"dashboard_Admin" , component:HomeAdminComponent },
  {path:"" , redirectTo:"/login",pathMatch:'full'},
  {path:"**" , component:PageNotFoundComponent} */
  