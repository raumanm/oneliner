import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: string[] = [];
  messages: string[] = [];
  name = "Guest";

  constructor(private chat: ChatService) {}
  
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit() {
    this.chat.messages.subscribe((data: Object) => {
      console.log(JSON.stringify(data));
      if (data.hasOwnProperty('names')) {
        this.users = data['names'];
      }
      if (data.hasOwnProperty('message')) {
        this.messages.push(data['message']);
      }
    });
    this.name = this.name + this.getRandomInt(10000, 99999);
    this.chat.register(this.name);
  }

  outgoingMsg(msg: string) {
    console.log(msg);
    this.chat.sendMsg(msg);
  }
}
