import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { TOASTER_TOKEN, Toastr } from '../common/toastr.service'

@Component({
  templateUrl: './profile.component.html',
  styles: [`
  em{
    float: right; color: #E05C65; padding-left: 10px;
  }
  .error input{
    background-color: #E3C3C5;
  }

  `]
})
export class ProfileComponent implements OnInit{
  private firstName : FormControl
  private lastName : FormControl
  constructor(private router : Router, private auth : AuthService, @Inject(TOASTER_TOKEN) private toastr : Toastr){

  }
  profileForm : FormGroup
       ngOnInit(): void {
         this.firstName = new FormControl(this.auth.currentUser.firstName, Validators.required)
         this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required)
         this.profileForm = new FormGroup({
          firstName: this.firstName,
          lastName: this.lastName
         })
       }
       cancel(){
        this.router.navigate(['events'])
       }
       saveProfile(formValues:any){
        if (this.profileForm.valid)
          this.auth.updateCurrentUser(formValues.firstName, formValues.lastName)
          this.toastr.success('Profile saved')
       }
}