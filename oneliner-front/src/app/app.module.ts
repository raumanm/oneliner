import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatService } from './chat.service';
import { WebsocketClientService } from './websocket-client.service';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { MessageBarComponent } from './message-bar/message-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ChatAreaComponent,
    MessageBarComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    WebsocketClientService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
