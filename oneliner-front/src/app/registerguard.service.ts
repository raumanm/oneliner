import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class RegisterGuard implements CanActivate {
    static registered: boolean = false;

    constructor(private router: Router) {}

    canActivate() {
        //console.log("RegisterGuard called.");
        if (!RegisterGuard.registered) {
            this.router.navigate(['login']);
        }
        return RegisterGuard.registered;
    }

    acquiredName() {
        //console.log('Registerguard ok');
        RegisterGuard.registered = true;
    }
}