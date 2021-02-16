import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { HNService } from './_shared/services/hn.service';
import { ThemeService } from './_shared/services/theme.service';

import { environment } from 'src/environments/environment';
import { MaterialModule } from './material.module';

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
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule
  ],
  providers: [
    HNService,
    ThemeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
