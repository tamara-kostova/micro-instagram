import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em {float:right; color: #E05C65; padding-left:10px;}
        .cancel-btn{
        background-color: #014f86;
        }
        .cancel-btn:hover{background-color:#2c7da0}
    `]
})
export class LoginComponent{
    userName : string
    password : string
    mouseoverLogin : boolean
    constructor(private authservice : AuthService, private router:Router){

    }
    login(formValues:any){
        this.authservice.loginUser(formValues.userName, formValues.password)
        this.router.navigate(['posts'])
    }
    cancel(){
        this.router.navigate(['posts'])
    }
}