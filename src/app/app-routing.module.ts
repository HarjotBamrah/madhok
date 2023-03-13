import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTyreComponent } from './add-tyre/add-tyre.component';
import { AddAlloysComponent } from './add-alloys/add-alloys.component';
import { TyresComponent } from './tyres/tyres.component';
// import { AddArchitectComponent } from './add-architect/add-architect.component';
// import { ArchitectsComponent } from './architects/architects.component';
// import { AuthenticateComponent } from './authenticate/authenticate.component';
// import { DesignsComponent } from './designs/designs.component';
// import { HomeComponent } from './home/home.component';
// import { ProfileComponent } from './profile/profile.component';
// import { ShowDesignsComponent } from './show-designs/show-designs.component';

const routes: Routes = [
  {path: 'tyres', component: AddTyreComponent},
  {path: 'alloys', component: AddAlloysComponent},
  {path: 'tyreSize', component: TyresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }