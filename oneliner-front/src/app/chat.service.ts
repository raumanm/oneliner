import { Injectable } from '@angular/core';
import { WebsocketClientService } from './websocket-client.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {
  static messages: Subject<any>;
  
  constructor(private wscService: WebsocketClientService) {}

  connect() {
    ChatService.messages = <Subject<any>>this.wscService
    .connect()
    .map((response: any): any => {
      return response;
    })
  }
  
  sendMsg(msg: string) {
    ChatService.messages.next({message: msg});
  }

  register(name: string) {
    ChatService.messages.next({register: name});
  }

  requestUsers() {
    //console.log("request users");
    ChatService.messages.next({users: true});
  }
}