import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxBarcode6Module } from 'ngx-barcode6';

import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SliderManagerComponent } from './slider-manager/slider-manager.component';
import { OrdersComponent } from './orders/orders.component';
import { StoresandcategoriesComponent } from './storesandcategories/storesandcategories.component';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { MyOrderfilter } from 'app/Shared/filter/order-filter.pipe';
import { CategoriesImageComponent } from './categories-image/categories-image.component';
import { ItemsComponent } from './items/items.component';
import { ItemfilterPipe } from 'app/Shared/filter/item-filter.pipe';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ItemsImageComponent } from './items-image/items-image.component';
import { ItemsDiscountComponent } from './items-discount/items-discount.component';
import { MoreToLoveComponent } from './more-to-love/more-to-love.component';
import { SellingFastComponent } from './selling-fast/selling-fast.component';
import { WebSiteInfoComponent } from './web-site-info/web-site-info.component';
import { MessagesComponent } from './messages/messages.component';
import { CustomerServicesComponent } from './customer-services/customer-services.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { NewslettertempleteComponent } from './newslettertemplete/newslettertemplete.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { StoreestimatedDateComponent } from './storeestimated-date/storeestimated-date.component';
import { MiddleimagesComponent } from './middleimages/middleimages.component';
import { QuantityAndAppearanceComponent } from './quantity-and-appearance/quantity-and-appearance.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ColorPickerModule } from 'ngx-color-picker';
import { ItemsDetailsComponent } from './items-details/items-details.component';
import { whytoChooseComponent } from './whytoChoose/whytoChoose.component';
import { articlesComponent } from './articles/articles.component';
import { cu_articlesComponent } from './cu-articles/cu-articles.component';
import { youtubeComponent } from './youtube/youtube.component';
import { BrandStoryComponent } from './BrandStory/BrandStory.component';
import { cu_BrandStoryComponent } from './cu-BrandStory/cu-BrandStory.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'slider',
    component: SliderManagerComponent,
    data: { animation: 'slider' }
  },
  {
    path: 'Orders',
    component: OrdersComponent,
    data: { animation: 'Orders' }
  },
  {
    path: 'storesandcat',
    component: StoresandcategoriesComponent,
    data: { animation: 'storesandcat' }
  },
  {
    path: 'CategoriesImage',
    component: CategoriesImageComponent,
    data: { animation: 'CategoriesImage' }
  },
  {
    path: 'items',
    component: ItemsComponent,
    data: { animation: 'items' }
  },
  {
    path: 'itemsimage/:id',
    component: ItemsImageComponent
  },
  {
    path: 'itemsdetails/:id',
    component: ItemsDetailsComponent
  },
  {
    path: 'itemsDiscount',
    component: ItemsDiscountComponent
  },
  {
    path: 'MoreToLoveComponent',
    component: MoreToLoveComponent
  },
  {
    path: 'SellingFast',
    component: SellingFastComponent
  },
  {
    path: 'WebsiteInfo',
    component: WebSiteInfoComponent
  },
  {
    path: 'Messages',
    component: MessagesComponent
  },
  {
    path: 'CustomerServices',
    component: CustomerServicesComponent
  },
  {
    path: 'Newsletter',
    component: NewsletterComponent
  },
  {
    path: 'whytoChoose',
    component: whytoChooseComponent
  }, {
    path: 'articles',
    component: articlesComponent
  },
  {
    path: 'youtube',
    component: youtubeComponent
  },
  {
    path: 'articles/:id',
    component: cu_articlesComponent
  },{
    path: 'BrandStory',
    component: BrandStoryComponent
  },
  
  {
    path: 'BrandStory/:id',
    component: cu_BrandStoryComponent
  },
  {
    path: 'Newslettertemplete',
    component: NewslettertempleteComponent
  },
  {
    path: 'OrderStatus',
    component: OrderstatusComponent
  },
  {
    path: 'EstimatedDate',
    component: StoreestimatedDateComponent
  }, {
    path: 'middleimages',
    component: MiddleimagesComponent
  }, {
    path: 'QuantitiesAndAppearances',
    component: QuantityAndAppearanceComponent
  },
];


@NgModule({
  declarations: [
    SliderManagerComponent,
    OrdersComponent,
    StoresandcategoriesComponent,
    MyOrderfilter,
    ItemfilterPipe,
    CategoriesImageComponent,
    ItemsComponent,
    ItemsImageComponent,
    ItemsDetailsComponent,
    ItemsDiscountComponent,
    MoreToLoveComponent,
    SellingFastComponent,
    WebSiteInfoComponent,
    MessagesComponent,
    CustomerServicesComponent,
    NewsletterComponent,
    whytoChooseComponent,
    articlesComponent, youtubeComponent,
    cu_articlesComponent,
    BrandStoryComponent,
    cu_BrandStoryComponent,
    NewslettertempleteComponent,
    OrderstatusComponent,
    StoreestimatedDateComponent,
    MiddleimagesComponent,
    QuantityAndAppearanceComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    CoreCardModule,
    NgxBarcode6Module,
    FileUploadModule,
    GalleryModule.forRoot(),
    ColorPickerModule

  ],

  exports: [SliderManagerComponent, GalleryModule],

  providers: []
})
export class PagesModule { }
