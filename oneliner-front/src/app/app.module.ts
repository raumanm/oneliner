import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatService } from './chat.service';
import { WebsocketClientService } from './websocket-client.service';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { MessageBarComponent } from './message-bar/message-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatBaseComponent } from './chat-base.component';
import { LoginComponent } from './login.component';
import { NotFoundComponent } from './notfound.component';
import { RegisterGuard } from './registerguard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    UserListComponent,
    ChatAreaComponent,
    MessageBarComponent,
    ChatBaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    WebsocketClientService,
    ChatService,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
