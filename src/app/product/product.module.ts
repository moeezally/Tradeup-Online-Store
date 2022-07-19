import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgParticlesModule } from 'ng-particles';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductHeroComponent } from './product-list/product-hero/product-hero.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HomeModule } from '../home/home.module';
import { SearchFilterPipe } from './searchFilter.pipe';
import { FormsModule } from '@angular/forms';
import { ProductSearchComponent } from './product-search/product-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductHeroComponent,
    SearchFilterPipe,
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MatExpansionModule,
    NgParticlesModule,
    NgxSkeletonLoaderModule,
    HomeModule,
    FormsModule,
    NgxPaginationModule,
    ScrollingModule
  ]
})
export class ProductModule {}
