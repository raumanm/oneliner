import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from './chat.service';
import { parseWebDriverCommand } from 'blocking-proxy/built/lib/webdriver_commands';

@Component({
  selector: 'app-chat-base',
  styles: [`
  #userlist {
    border-right: 3px dotted lightblue;
  }
  #chatarea {
    height: inherit;
    overflow-y: auto;
  }
  #upper {
    /* Firefox */
    height: -moz-calc(100% - 50px);
    /* WebKit */
    height: -webkit-calc(100% - 50px);
    /* Opera */
    height: -o-calc(100% - 50px);
    /* Standard */
    height: calc(100% - 50px);
  }
  #messagebar {
    height: 50px;
  }
  #basechat {
    height: 100%;
  }
  `],
  template: `
  <div class="column" id="basechat">
    <div class="row" id="upper">
      <div class="col-md-2" id="userlist"><app-user-list [usernames]="users"></app-user-list></div>
      <div class="col" id="chatarea"><app-chat-area [msgs]="messages"></app-chat-area></div>
    </div>
    <div class="row" id="lower">
      <div class="col" id="messageBar"><app-message-bar (outgoing)="outgoingMsg($event)"></app-message-bar></div>
    </div>
  </div>
  `
})
export class ChatBaseComponent implements OnInit, AfterViewInit {
  users: string[] = [];
  messages: string[] = [];

  constructor(private chat: ChatService) {}

  putMessage(str: string) {
    //if (this.messages.length > 28) this.messages.shift();

    this.messages.push("< " + new Date().toLocaleTimeString() + ": "  +str);
  }

  sortUsers() {
    this.users = this.users.sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase())
        return -1;
      if (a.toLowerCase() > b.toLowerCase())
        return 1;
      return 0;
    });
  }
  
  ngOnInit() {
    ChatService.messages.subscribe((data: Object) => {
      console.log(JSON.stringify(data));

      if (data.hasOwnProperty('message')) {
        this.putMessage(data['message']);
      }

      else if (data.hasOwnProperty('names')) {
        //console.log(data);
        this.users = data['names'].sort((a, b) => {
          if (a.toLowerCase() < b.toLowerCase())
            return -1;
          if (a.toLowerCase() > b.toLowerCase())
            return 1;
          return 0;
        });
      }

      else if (data.hasOwnProperty('joined')) {
        this.users.push(data['joined']);
        this.sortUsers();
        this.putMessage(data['joined'] + "> has connected.");
      }

      else if (data.hasOwnProperty('removed')) {
        this.users = this.users.filter(el => el !== data['removed']);
        this.putMessage(data['removed'] + "> has disconnected.");
      }
    });

    this.putMessage("> Welcome to Oneliner.");
  }

  ngAfterViewInit(): void {
    this.chat.requestUsers();
  }

  parseCommand(command: string ) {
    let words = command.split(' ');
    if (words.length > 2) { 
      let keyword = words.shift();
      if (keyword === '/message'
        || keyword === '/msg'
        || keyword === '/tell'
        || keyword === '/whisper') {
        this.chat.privateMsg(words.shift(), words.join(' '));
      }
    }
  }

  outgoingMsg(msg: string) {
    //console.log(msg);

    if (msg.charAt(0) === '/') {
      this.parseCommand(msg);
    } else {
      this.chat.sendMsg(msg);
    }
  }
}