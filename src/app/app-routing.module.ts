import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyModuleComponent } from './my-module/my-module.component';
import { YouModuleComponent } from './you-module/you-module.component';


const routes: Routes = [
  { path: '', redirectTo: '/myModule', pathMatch: 'full' },
  { path: 'myModule', component: MyModuleComponent },
  { path: 'youModule', component: YouModuleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
