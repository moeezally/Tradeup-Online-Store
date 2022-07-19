import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    children: [
      {
        path: '',
        component: OrdersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: OrderDetailsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
