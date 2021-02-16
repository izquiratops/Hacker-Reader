import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { FeedComponent } from './feed.component';
import { FeedService } from './feed.service';
import { HeaderPipe } from '../_shared/pipes/headerTitle.pipe';
import { PostFromPipe } from '../_shared/pipes/postFrom.pipe';
import { DomainPipe } from '../_shared/pipes/domain.pipe';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent
  }
]

@NgModule({
  declarations: [
    ToolbarComponent,
    FeedComponent,
    HeaderPipe,
    PostFromPipe,
    DomainPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  providers: [
    FeedService
  ]
})
export class FeedModule { }
