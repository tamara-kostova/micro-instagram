import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router"
import { ProfileComponent } from "./profile.component";
import { userRoutes } from "./user.routes";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild(userRoutes),
        ReactiveFormsModule
    ],
    declarations:[
        ProfileComponent,
        LoginComponent
    ],
    providers:[],
    bootstrap:[]
})
export class UserModule{

}