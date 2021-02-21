import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';

import { FeedComponent } from './feed.component';
import { CommentsComponent } from './comments/comments.component';
import { PipesModule } from '../pipes.module';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent
  },
  {
    path: ':id',
    component: CommentsComponent
  }
]

@NgModule({
  declarations: [
    FeedComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PipesModule
  ]
})
export class FeedModule { }
