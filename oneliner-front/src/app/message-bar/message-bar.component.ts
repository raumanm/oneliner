import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-bar',
  styles: ['./message-bar.component.css'],
  template: `
    <input type="text" #messagebar (keyup.enter)="enterpressed($event)" required/>
  `
})
export class MessageBarComponent implements OnInit {

  @Output() outgoing = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  enterpressed(evt) {
    console.log(evt);
    if (/\S/.test(evt.target.value)) {
      this.outgoing.emit(evt.target.value);
    }
    evt.target.value = "";
  }
}
