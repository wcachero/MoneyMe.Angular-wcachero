//Developed by: Wilson Cachero
//For MoneymeExam

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddLoanDataComponent } from './components/add-loan-data/addLoanData.component';
import { AcknowledgmentComponent } from './components/acknowledgment/acknowledgment.component';
import { AppRoutingModule } from './app-routing.module';
import { LoanService } from './services/loan.service';
import { BlacklistedPhoneComponent } from './components/blacklisted-phone/blacklisted-phone.component';
import { ProductComponent } from './components/product/product.component';
import { BlacklistedEmailDomainComponent } from './components/blacklisted-email-domain/blacklisted-email-domain.component';

@NgModule({
  declarations: [
    AppComponent,
    AddLoanDataComponent,
    AcknowledgmentComponent,
    BlacklistedPhoneComponent,
    ProductComponent,
    BlacklistedEmailDomainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [LoanService],
  bootstrap: [AppComponent]
})
export class AppModule { }