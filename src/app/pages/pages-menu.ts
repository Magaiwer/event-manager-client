import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'HOME',
    link: '/',
    icon: 'home',
    home: true,
    selected: true,
    pathMatch: 'prefix',
  },
  {
    title: 'Eventos',
    icon: 'calendar-outline',
    selected: false,
    pathMatch: 'prefix',
    link: '/pages/events/',
  },
  {
    title: 'Minhas inscrições',
    icon: 'checkmark-square',
    selected: false,
    pathMatch: 'prefix',
    link: '/pages/subscriptions/',
  },
  {
    title: 'Validar Certificado',
    icon: 'checkmark-outline',
    selected: false,
    pathMatch: 'prefix',
    link: '/pages/certificate/',
  },

      /*{
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },*/


  /*{
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },*/
];
