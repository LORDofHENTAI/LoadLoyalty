import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoyaltyLoadComponent } from './components/loyalty-load/loyalty-load.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  { path: '', redirectTo: 'loyalty/load', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'loyalty/load', component: LoyaltyLoadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
