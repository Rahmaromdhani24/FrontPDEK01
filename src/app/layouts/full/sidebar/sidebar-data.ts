import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
    bgcolor: 'primary',
    roles: ['ADMIN','OPERATEUR'], 
  },
  {
    navCap: 'Utilisateurs',
  },
  {
    displayName: 'Opérateurs',
    iconName: 'users-group',
    bgcolor: 'secondary',
    roles: ['ADMIN','OPERATEUR'], 
    //chip: true,
    //chipClass: 'bg-primary text-white',
    //chipContent: 'PRO',
    //route: 'apps/blog',
    children: [
      {
        displayName: 'Post',
        iconName: 'point',
        bgcolor: 'tranparent',
        external: true,
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: 'PRO',
        route: 'https://spike-angular-pro-main.netlify.app/apps/blog/post',
      },
      {
        displayName: 'Detail',
        iconName: 'point',
        bgcolor: 'tranparent',
        external: true,
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: 'PRO',
        route:
          'https://spike-angular-pro-main.netlify.app/apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
      },
    ],
  },
  {
    displayName: 'Chefs des lignes',
    iconName: 'users',
    bgcolor: 'warning',
    //chip: true,
    //chipClass: 'bg-primary text-white',
    //chipContent: 'PRO',
    //route: 'apps/blog',
    children: [
      {
        displayName: 'Post',
        iconName: 'point',
        bgcolor: 'tranparent',
        external: true,
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: 'PRO',
        route: 'https://spike-angular-pro-main.netlify.app/apps/blog/post',
      },
      {
        displayName: 'Detail',
        iconName: 'point',
        bgcolor: 'tranparent',
        external: true,
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: 'PRO',
        route:
          'https://spike-angular-pro-main.netlify.app/apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
      },
    ],
  },
  
  {
    displayName: 'Agents des Qualité',
    iconName: 'users',
    bgcolor: 'success',
    //chip: true,
    //chipClass: 'bg-primary text-white',
    //chipContent: 'PRO',
    //route: 'apps/blog',
    children: [
      {
        displayName: 'Post',
        iconName: 'point',
        bgcolor: 'tranparent',
        external: true,
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: 'PRO',
        route: 'https://spike-angular-pro-main.netlify.app/apps/blog/post',
      },
      {
        displayName: 'Detail',
        iconName: 'point',
        bgcolor: 'tranparent',
        external: true,
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: 'PRO',
        route:
          'https://spike-angular-pro-main.netlify.app/apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
      },
    ],
  },
  {
    displayName: 'Techniciens',
    iconName: 'users',
    bgcolor: 'error',
    //chip: true,
    //chipClass: 'bg-primary text-white',
    //chipContent: 'PRO',
    //route: 'apps/blog',
    children: [
      {
        displayName: 'Post',
        iconName: 'point',
        bgcolor: 'tranparent',
        external: true,
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: 'PRO',
        route: 'https://spike-angular-pro-main.netlify.app/apps/blog/post',
      },
      {
        displayName: 'Detail',
        iconName: 'point',
        bgcolor: 'tranparent',
        external: true,
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: 'PRO',
        route:
          'https://spike-angular-pro-main.netlify.app/apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
      },
    ],
  },
  
  
  {
    navCap: 'PDEK',
  },
  
  {
    displayName: 'PDEKs',
    iconName: 'file-text',
    route: '/ui-components/menu',
    bgcolor: 'primary',
    roles: ['ADMIN', 'OPERATEUR'], 

  }, 
  
  {
    navCap: 'Statistiques',
  },
  {
    displayName: 'Utilisateurs',
    iconName: 'chart-line',
    route: 'https://spike-angular-pro-main.netlify.app/charts/line',
    bgcolor: 'error',
    external: true,
    chip: true,
    chipClass: 'bg-primary text-white',
    chipContent: 'PRO',
    roles: ['ADMIN', 'OPERATEUR'], 

  },
  {
    displayName: 'Plant',
    iconName: 'chart-arcs',
    route: 'https://spike-angular-pro-main.netlify.app/charts/gredient',
    bgcolor: 'primary',
    external: true,
    chip: true,
    chipClass: 'bg-primary text-white',
    chipContent: 'PRO',
    roles: ['ADMIN', 'OPERATEUR'], 

  },
  {
    displayName: 'Segmets',
    iconName: 'chart-area',
    route: 'https://spike-angular-pro-main.netlify.app/charts/area',
    bgcolor: 'secondary',
    external: true,
    chip: true,
    chipClass: 'bg-primary text-white',
    chipContent: 'PRO',
    roles: ['ADMIN', 'OPERATEUR'], 

  },
  {
    displayName: 'Machines',
    iconName: 'chart-candle',
    route: 'https://spike-angular-pro-main.netlify.app/charts/candlestick',
    bgcolor: 'warning',
    external: true,
    chip: true,
    chipClass: 'bg-primary text-white',
    chipContent: 'PRO',
    roles: ['ADMIN', 'OPERATEUR'], 

  },
  {
    navCap: 'Archives',
  },
  {
    displayName: 'Archives',
    iconName: 'archive',
    route: '/ui-components/badge',
    bgcolor: 'warning',
    roles: ['ADMIN', 'OPERATEUR'], 

  },

  {
    navCap: 'Historiques',
    roles: ['ADMIN','OPERATEUR'], 
  },
  {
    displayName: 'Historiques utilisateurs',
    iconName: 'history',
    route: '/ui-components/badge',
    bgcolor: 'warning',
    roles: ['ADMIN','OPERATEUR'], 

  },
];
