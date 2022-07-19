export interface Menu {
  path: string;
  name: string;
  icon: string;
}

export const menuList: Menu[] = [
  {
    path: 'products',
    name: 'Products',
    icon: 'store'
  },
  {
    path: 'about',
    name: 'About',
    icon: 'info'
  },
  {
    path: 'contact',
    name: 'Contact',
    icon: ' email'
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard'
  // },
  {
    path: 'cart',
    name: 'Cart',
    icon: 'shopping_cart'
  }
];
