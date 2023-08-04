import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router} from "@angular/router"
import { CompletePostService } from "../shared/completeposts.service";
import { IPost } from "../shared/post.model";
import { Photo } from "../shared/photo.model";
import { Post } from "../shared/post-short.model";
import { PostDetailsService } from "../shared/postdetails.service";
import { PostListService } from "../shared/postlist.service";

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
    @Input() post?:IPost
    constructor (private postdetailsservice : PostDetailsService, private postlistservice : PostListService ,private route : ActivatedRoute, private router : Router){

    }
    ngOnInit(){
        this.postdetailsservice.getPost(+this.route.snapshot.params['id']).subscribe(data=>{this.post=data})
    }
    deletePost(id:any){
        if (window.confirm("Are you sure you want to delete this post?")) {
            this.postlistservice.deletePost(id)
            this.router.navigate(['/posts'])
      }
    }
    editPost(id:any){
        this.postlistservice.getIdforEdit(id)
    }
}