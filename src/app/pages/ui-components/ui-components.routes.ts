import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { AddPistoletMecaniqueComponent } from './add-pistolet-mecanique/add-pistolet-mecanique.component';
import { AddPistoletPneumatiqueComponent } from './add-pistolet-pneumatique/add-pistolet-pneumatique.component';
import { ChartAddPistoletJauneComponent } from './chart-add-pistolet-jaune/chart-add-pistolet-jaune.component';
import { ChartAddPistoletVertComponent } from './chart-add-pistolet-vert/chart-add-pistolet-vert.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'addPistoletMecanique',
        component: AddPistoletMecaniqueComponent,
      },
     {
        path: 'addPistoletPneumatique',
        component: AddPistoletPneumatiqueComponent,
      } ,
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'chartAddPistoletJaune',
        component: ChartAddPistoletJauneComponent,
      },
      {
        path: 'chartAddPistoletVert',
        component: ChartAddPistoletVertComponent,
      },/*
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },*/
    ],
  },
];
