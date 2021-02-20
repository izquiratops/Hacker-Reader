import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';

import { FeedComponent } from './feed.component';
import { CommentsComponent } from './comments/comments.component';
import { PaddingPipe, RepliesPipe } from '../_shared/pipes';
import { PostFromPipe } from '../_shared/pipes';
import { HeaderPipe } from '../_shared/pipes';
import { DomainPipe } from '../_shared/pipes';
import { IconThemePipe } from '../_shared/pipes';

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
    CommentsComponent,
    DomainPipe,
    HeaderPipe,
    PostFromPipe,
    RepliesPipe,
    IconThemePipe,
    PaddingPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class FeedModule { }
