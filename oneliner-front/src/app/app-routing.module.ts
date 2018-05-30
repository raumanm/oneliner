import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { NotFoundComponent } from './notfound.component';
import { ChatBaseComponent } from './chat-base.component';
import { RegisterGuard } from './registerguard.service';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat-base', component: ChatBaseComponent, canActivate: [RegisterGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }