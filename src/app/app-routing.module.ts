import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-module1',
    pathMatch: 'full'
  },
  {
    path: 'my-module1',
    loadChildren: () =>
      import('./my-module1/my-module1.module').then(m => m.MyModule1Module)
  },
  {
    path: 'my-module2',
    loadChildren: () =>
      import('./my-module2/my-module2.module').then(m => m.MyModule2Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
