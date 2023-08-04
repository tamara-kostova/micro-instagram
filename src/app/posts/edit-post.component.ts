import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompletePostService } from "./shared/completeposts.service";
import { IPost } from "./shared/post.model";
import { PostListService } from "./shared/postlist.service";

@Component({
    templateUrl: './edit-post.component.html',
    styles:[`
    em{ float: right; color: #E05C65; padding-left: 10px;}
    .error input{background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999}
    .error ::-moz-placeholder {color: #999}
    .error :-moz-placeholder {color: #999}
    .error :ms-input-placeholder {color: #999}
    button{
        background-color: #014f86;
        margin-left:2.5px;
        margin-right:2.5px;
      }
      button:hover{background-color:#2c7da0}
    `]
})
export class EditPostComponent implements OnInit{
    post : any
    isDirty:boolean
    userId: string
    id: string
    title: string
    body: string
    url: string
    thumbnailUrl: string
    edited : IPost
    constructor (private router:Router, private postlistservice : PostListService){
        this.edited = new IPost(this.userId,this.id,this.title,this.body,this.url,this.thumbnailUrl)
    }
    cancel(){
        this.router.navigate(['/posts'])
    }
    editPost(){
        this.postlistservice.editPost(this.edited)?.subscribe()
        this.isDirty=false;
        this.router.navigate(['/posts'])
    }
    ngOnInit(): void {
        this.id = this.postlistservice.idforEdit
    }
}