import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SideNavComponent } from './main/side-nav/side-nav.component';
import { ContentComponent } from './main/content/content.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { BuyingContainerComponent } from './buying-container/buying-container.component';
import { BuyingRowComponent } from './buying-container/buying-row/buying-row.component';
import { SaleContainerComponent } from './sale-container/sale-container.component';
import { SaleRowComponent } from './sale-container/sale-row/sale-row.component';
import { FooterComponent } from './footer/footer.component';
import { TopFooterComponent } from './footer/top-footer/top-footer.component';
import { BottomFooterComponent } from './footer/bottom-footer/bottom-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SideNavComponent,
    ContentComponent,
    VendorComponent,
    VendorListComponent,
    BuyingContainerComponent,
    BuyingRowComponent,
    SaleContainerComponent,
    SaleRowComponent,
    FooterComponent,
    TopFooterComponent,
    BottomFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
