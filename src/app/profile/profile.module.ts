import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';

@NgModule({
  declarations: [ProfileComponent, EditProfileComponent, OrdersComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatMenuModule
  ]
})
export class ProfileModule {}
