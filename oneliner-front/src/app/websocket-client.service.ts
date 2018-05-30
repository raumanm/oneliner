import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketClientService {
  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io('http://localhost:3300');

    const observable = new Observable(observer => {
        this.socket.on('message', (data) => {
          //console.log('Received message from Websocket Server');
          observer.next({message: data});
        });
        this.socket.on('names', (data) => {
          //console.log(data);
          observer.next({names: data});
        });
        this.socket.on('removed', (data) => {
          //console.log(data);
          observer.next({removed: data});
        });
        this.socket.on('registered', (data) => {
          //console.log(data);
          observer.next({registered: data});
        })
        this.socket.on('joined', data => observer.next({joined: data}));

        return () => {
          this.socket.disconnect();
        };
    });

    const observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        }
    };

    return Rx.Subject.create(observer, observable);
  }
}
