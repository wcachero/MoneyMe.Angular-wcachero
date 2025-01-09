import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLoanDataComponent } from './components/add-loan-data/addLoanData.component';
import { AcknowledgmentComponent } from './components/acknowledgment/acknowledgment.component';
import { BlacklistedPhoneComponent } from './components/blacklisted-phone/blacklisted-phone.component';
import { ProductComponent } from './components/product/product.component';
import { BlacklistedEmailDomainComponent } from './components/blacklisted-email-domain/blacklisted-email-domain.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-loan-data', pathMatch: 'full' },
  { path: 'add-loan-data', component: AddLoanDataComponent },
  { path: 'app-blacklisted-phone', component: BlacklistedPhoneComponent },
  { path: 'acknowledgment', component: AcknowledgmentComponent },
  { path: 'app-product', component: ProductComponent },
  { path: 'app-blacklisted-email-domain', component: BlacklistedEmailDomainComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }