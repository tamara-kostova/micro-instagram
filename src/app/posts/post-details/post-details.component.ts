import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router} from "@angular/router"
import { CompletePostService } from "../shared/completeposts.service";
import { IPost } from "../shared/post.model";

@Component({
    templateUrl:'./post-details.component.html',
    styles:[`
        .container{padding-left:20px;}
        .post-image{height: 300px;}
        button{
        margin-bottom: 20px;
        background-color: #014f86;
        margin-left:2.5px;
        margin-right:2.5px;
      }
      button:hover{background-color:#2c7da0}
    `]
})
export class PostDetailsComponent implements OnInit{
    post?:IPost
    constructor (private postservice : CompletePostService, private route : ActivatedRoute, private router : Router){

    }
    ngOnInit(){
        this.postservice.getPost(+this.route.snapshot.params['id']).subscribe(data=>{this.post=data})
    }
    deletePost(id:any){
        if (window.confirm("Are you sure you want to delete this post?")) {
            this.postservice.removePost(id)
            this.router.navigate(['/posts'])
      }
    }
      edit(id:any){
        this.postservice.getIdforEdit(id)
      }
}