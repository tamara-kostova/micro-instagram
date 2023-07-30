import { Component, OnInit } from "@angular/core";
import { ActivatedRoute} from "@angular/router"
import { CompletePostService } from "../shared/completeposts.service";
import { IPost } from "../shared/post.model";

@Component({
    templateUrl:'./post-details.component.html',
    styles:[`
        .container{padding-left:20px;}
        .post-image{height: 300px;}
    `]
})
export class PostDetailsComponent implements OnInit{
    post?:IPost
    constructor (private postservice : CompletePostService, private route : ActivatedRoute){

    }
    ngOnInit(){
        this.postservice.getPost(+this.route.snapshot.params['id']).subscribe(data=>{this.post=data})
    }
}