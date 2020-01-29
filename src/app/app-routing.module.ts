import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirmaElectronicaComponent } from './firma-electronica/firma-electronica.component';


const routes: Routes = [
  { path: 'firma-electronica', component: FirmaElectronicaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
