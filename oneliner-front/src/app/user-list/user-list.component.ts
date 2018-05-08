import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-list',
  styles: [`
ul {
  list-style-type: none;
}
  `],
  template: `
  <span>People</span>
  <ul>
    <li *ngFor="let name of usernames">{{name}}</li>
  </ul>
  `
})
export class UserListComponent implements OnInit {
  @Input() usernames: string[];

  constructor() { }

  ngOnInit() {
  }

}
