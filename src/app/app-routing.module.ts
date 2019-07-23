import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent  } from './article.component';

const routes: Routes = [
  {
    path: 'apple',
    component: ArticleComponent,
    data: {
      breadcrumb: 'Apple'
    },
    children: [
      {
        path: 'steve',
        component: ArticleComponent,
        data: {
          breadcrumb: 'Steve'
        },
        children: [
          {
            path: 'jobs',
            component: ArticleComponent,
            data: {
              breadcrumb: 'Jobs'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
