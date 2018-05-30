import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  styles: [`
  #chatbase {
    height: 90%;
    border: 3px solid lightblue;
    border-radius: 15px;
  }
  h1 {
    text-align: center;
  }
  `],
  template: `
  <h1>Oneliner</h1>
  <div id="chatbase" class="container rounded">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent implements OnInit {S
  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.chat.connect();
  }
}
