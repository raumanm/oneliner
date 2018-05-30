import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';
import { RegisterGuard } from './registerguard.service';

@Component({
  selector: 'app-login',
  styles: [`
  #loginForm {
  }
  `],
  template: `  
  <div class="row justify-content-md-center h-100">
    <div class="col-md-3 justify-content-center align-self-center my-auto">
      <form id="loginform" class="form-signin">
      <label for="name" class="sr-only">Name:</label>
      <input id="name"
          type="text"
          class="form-control"
          placeholder="Enter name"
          name="name"
          required 
          minlength="3"
          maxlength="20"
          #nameElement="ngModel"
          (keyup.enter)="checkName(nameElement.value)"
          [(ngModel)]="name"/>
      </form>
      <span *ngIf="invalid">Name is incorrect or taken</span>
    </div>
  </div>
`
})
export class LoginComponent implements OnInit {
    name: string;
    invalid: boolean = false;

    constructor(private router: Router, private chat: ChatService, private rg: RegisterGuard) {}

    ngOnInit() {
        ChatService.messages.subscribe((data: Object) => {
            //console.log(JSON.stringify(data));
            if (data.hasOwnProperty('registered')) {
                this.getCheckResult(Boolean(data['registered']));
            }
          });
    }

    getCheckResult(registered: boolean) {
        //console.log("registered.login: " + registered);
        if (registered) {
            this.rg.acquiredName();
            this.router.navigate(['chat-base']);
        } else {
            this.invalid = true;
            this.name = "";
        }
    }

    checkName(name: string) {
        this.chat.register(name);
    }
}