import { Injectable } from '@angular/core';
import { WebsocketClientService } from './websocket-client.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {
  messages: Subject<any>;
  
  constructor(private wscService: WebsocketClientService) {
    this.messages = <Subject<any>>wscService
      .connect()
      .map((response: any): any => {
        return response;
      })
   }
  
  sendMsg(msg: string) {
    this.messages.next({message: msg});
  }

  register(name: string) {
    this.messages.next({register: name});
  }
}