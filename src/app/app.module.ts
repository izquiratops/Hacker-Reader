import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { HNService } from './_shared/services/hn.service';
import { SharedService } from './_shared/services/shared.service';

import { environment } from 'src/environments/environment';
import { CustomReuseStrategy } from './routing';

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
    MaterialModule,
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
