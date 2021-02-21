import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';

import { HNService } from './shared/hn.service';
import { SharedService } from './shared/shared.service';

import { environment } from 'src/environments/environment';
import { CustomReuseStrategy } from './shared/routing';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule)
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    HNService,
    SharedService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
